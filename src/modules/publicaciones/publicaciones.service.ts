import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { CreatePublicacionDto } from './dto/create-publicaciones.dto';
import { UpdatePublicacionDto } from './dto/update-publicaciones.dto';
import { SearchPublicacionDto } from './dto/search-publicaciones.dto';
import { ResponseHelper } from 'src/common/helpers/response.helpers';

@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private publicacionModel:
        Model<PublicacionDocument>,
    ) {}

    /**
     * metodo para crear una publicacion
     */
    async create(dto: CreatePublicacionDto) {
        const publicacion =
        await this.publicacionModel.create(dto);

        return ResponseHelper.success(
            publicacion,
            201,
        );
    }

    /**
     * metodo para obtener todas las publicaciones
     */
    async findAll(query: SearchPublicacionDto) {
        const filtro: any = { activo: true };

        if (query.usuario_id) filtro.usuario_id = query.usuario_id;
        if (query.contenido) filtro.contenido = { $regex: query.contenido, $options: 'i' };

        const publicaciones =
        await this.publicacionModel.find(filtro);

        return ResponseHelper.success(publicaciones);
    }

    /**
     * metodo para obtener publicaciones inactivas
     */
    async findInactive() {
        const publicaciones =
        await this.publicacionModel.find({ activo: false });

        return ResponseHelper.success(publicaciones);
    }

    /**
     * metodo para obtener una publicacion por id
     */
    async findOne(id: string) {
        const publicacion =
        await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        return ResponseHelper.success(publicacion);
    }

    /**
     * metodo para actualizar una publicacion
     */
    async update(id: string, dto: UpdatePublicacionDto) {
        const publicacion =
        await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const updatedPublicacion =
        await this.publicacionModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );

        return ResponseHelper.success(updatedPublicacion);
    }

    /**
     * actualizacion parcial
     */
    async updatePartial(id: string, dto: UpdatePublicacionDto) {
        const publicacion =
        await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const updatedPublicacion =
        await this.publicacionModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true },
        );

        return ResponseHelper.success(updatedPublicacion);
    }

    /**
     * eliminacion logica
     */
    async remove(id: string) {
        const publicacion =
        await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const deletedPublicacion =
        await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.success(deletedPublicacion);
    }

    /**
     * restaurar publicacion eliminada
     */
    async restore(id: string) {
        const publicacion =
        await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        return ResponseHelper.success(publicacion);
    }
}