import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seguidor, SeguidorDocument } from "./schema/seguidores.schema";
import { CreateSeguidoresDto } from "./dto/create-seguidores.dto";
import { SearchSeguidoresDto } from "./dto/search-seguidores.dto";
import { UpdateSeguidoresDto } from "./dto/update-seguidores.dto";
import { ResponseHelper } from "src/common/helpers/response.helpers";

@Injectable()
export class SeguidoresService {

    constructor(
        @InjectModel(Seguidor.name)
        private readonly seguidoresModel: Model<SeguidorDocument>,
    ) {}

    async create(dto: CreateSeguidoresDto) {

        const exists = await this.seguidoresModel.findOne({
            usuario_id: dto.usuario_id,
            seguido_id: dto.seguido_id,
            activo: true,
        });

        if (exists) {
            throw new BadRequestException("El usuario ya sigue a este perfil");
        }

        const seguimiento = await this.seguidoresModel.create(dto);

        return ResponseHelper.success(seguimiento, 201);
    }

    async findAll(search: SearchSeguidoresDto) {

        const filter: any = { activo: true };

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        if (search.seguido_id) {
            filter.seguido_id = search.seguido_id;
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.seguidoresModel
            .find(filter)
            .populate("usuario_id")
            .populate("seguido_id")
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.seguidoresModel.countDocuments(filter);

        return ResponseHelper.success({
            total,
            page,
            limit,
            data,
        });
    }

    async findOne(id: string) {

        const seguimiento = await this.seguidoresModel
            .findById(id)
            .populate("usuario_id")
            .populate("seguido_id");

        if (!seguimiento) {
            throw new NotFoundException("Seguimiento no encontrado");
        }

        return ResponseHelper.success(seguimiento);
    }

    async update(id: string, dto: UpdateSeguidoresDto) {

        const seguimiento = await this.seguidoresModel.findById(id);

        if (!seguimiento) {
            throw new NotFoundException("Seguimiento no encontrado");
        }

        const updateSeguimiento = await this.seguidoresModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );

        return ResponseHelper.success(updateSeguimiento);
    }

    async remove(id: string) {

        const seguimiento = await this.seguidoresModel.findById(id);

        if (!seguimiento) {
            throw new NotFoundException("Seguimiento no encontrado");
        }

        const deleteSeguimiento = await this.seguidoresModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.success(deleteSeguimiento);
    }
}