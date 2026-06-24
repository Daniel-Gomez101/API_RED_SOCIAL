import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comentario, ComentarioDocument } from './schemas/comentario.schema';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { SearchComentarioDto } from './dto/search-comentario.dto';
import { ResponseHelper } from 'src/common/helpers/response.helpers';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentario.name)
        private comentarioModel:
        Model<ComentarioDocument>,
    ) {}

    /**
     * metodo para crear un comentario
     */
    async create(dto: CreateComentarioDto) {
        const comentario =
        await this.comentarioModel.create(dto);

        return ResponseHelper.success(
            comentario,
            201,
        );
    }

    /**
     * metodo para obtener todos los comentarios
     */
    async findAll(query: SearchComentarioDto) {
        const filtro: any = { activo: true };

        if (query.usuario_id) filtro.usuario_id = query.usuario_id;
        if (query.publicacion_id) filtro.publicacion_id = query.publicacion_id;
        if (query.contenido) filtro.contenido = { $regex: query.contenido, $options: 'i' };

        const comentarios =
        await this.comentarioModel.find(filtro);

        return ResponseHelper.success(comentarios);
    }

    /**
     * metodo para obtener comentarios inactivos
     */
    async findInactive() {
        const comentarios =
        await this.comentarioModel.find({ activo: false });

        return ResponseHelper.success(comentarios);
    }

    /**
     * metodo para obtener un comentario por id
     */
    async findOne(id: string) {
        const comentario =
        await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        return ResponseHelper.success(comentario);
    }

    /**
     * metodo para actualizar un comentario
     */
    async update(id: string, dto: UpdateComentarioDto) {
        const comentario =
        await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const updatedComentario =
        await this.comentarioModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );

        return ResponseHelper.success(updatedComentario);
    }

    /**
     * actualizacion parcial
     */
    async updatePartial(id: string, dto: UpdateComentarioDto) {
        const comentario =
        await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const updatedComentario =
        await this.comentarioModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true },
        );

        return ResponseHelper.success(updatedComentario);
    }

    /**
     * eliminacion logica
     */
    async remove(id: string) {
        const comentario =
        await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const deletedComentario =
        await this.comentarioModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.success(deletedComentario);
    }

    /**
     * restaurar comentario eliminado
     */
    async restore(id: string) {
        const comentario =
        await this.comentarioModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        return ResponseHelper.success(comentario);
    }
}