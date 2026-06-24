import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Reaccion, ReaccionDocument } from "./schemas/reacciones.schema";
import { CreateReaccionesDto } from "./dto/create-reacciones.dto";
import { SearchReaccionesDto } from "./dto/search-reacciones.dto";
import { UpdateReaccionesDto } from "./dto/update-reacciones.dto";
import { ResponseHelper } from "src/common/helpers/response.helpers";

@Injectable()
export class ReaccionesService {

    constructor(
        @InjectModel(Reaccion.name)
        private readonly reaccionModel: Model<ReaccionDocument>,
    ) {}

    /**
     * Crear una reacción
     */
    async create(dto: CreateReaccionesDto) {

        // Verificar que el usuario no haya reaccionado ya a la misma publicación
        const exists = await this.reaccionModel.findOne({
            usuario_id: dto.usuario_id,
            publicacion_id: dto.publicacion_id,
            activo: true,
        });

        if (exists) {
            throw new BadRequestException("El usuario ya reaccionó a esta publicación");
        }

        const reaccion = await this.reaccionModel.create(dto);

        return ResponseHelper.success(reaccion, 201);
    }

    /**
     * Consultar todas las reacciones
     */
    async findAll(search: SearchReaccionesDto) {

        const filter: any = { activo: true };

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        if (search.publicacion_id) {
            filter.publicacion_id = search.publicacion_id;
        }

        if (search.tipo) {
            filter.tipo = {
                $regex: search.tipo,
                $options: "i",
            };
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.reaccionModel
            .find(filter)
            .populate("usuario_id")
            .populate("publicacion_id")
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.reaccionModel.countDocuments(filter);

        return ResponseHelper.success({
            total,
            page,
            limit,
            data,
        });
    }

    /**
     * Consultar una reacción por ID
     */
    async findOne(id: string) {

        const reaccion = await this.reaccionModel
            .findById(id)
            .populate("usuario_id")
            .populate("publicacion_id");

        if (!reaccion) {
            throw new NotFoundException("Reacción no encontrada");
        }

        return ResponseHelper.success(reaccion);
    }

    /**
     * Actualizar una reacción
     */
    async update(id: string, dto: UpdateReaccionesDto) {

        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException("Reacción no encontrada");
        }

        const updateReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );

        return ResponseHelper.success(updateReaccion);
    }

    /**
     * Eliminar una reacción (Soft Delete)
     */
    async remove(id: string) {

        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException("Reacción no encontrada");
        }

        const deleteReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        return ResponseHelper.success(deleteReaccion);
    }
}