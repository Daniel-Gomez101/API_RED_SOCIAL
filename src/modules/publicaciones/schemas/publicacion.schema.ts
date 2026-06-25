import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

@Schema({
    timestamps: true,
    collection: 'publicaciones',
})
export class Publicacion {

    @Prop({ required: true })
    contenido!: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuario_id!: Types.ObjectId;

    @Prop({ default: true })
    activo!: boolean;
}

export const PublicacionSchema =
    SchemaFactory.createForClass(Publicacion);