import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema({ 
    timestamps: true, 
    collection: 'comentarios',
})
export class Comentario {
    @Prop({ required: true })
    contenido!: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    usuario_id!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Publicacion', required: true })
    publicacion_id!: Types.ObjectId;

    @Prop({ default: true })
    activo!: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);