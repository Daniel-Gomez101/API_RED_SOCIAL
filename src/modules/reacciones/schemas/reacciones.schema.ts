import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ReaccionDocument = Reaccion & Document;

@Schema({
    timestamps: true,
    collection: 'reacciones',
})
export class Reaccion {

    @Prop({
        type: Types.ObjectId,
        ref: "User",
        required: true,
    })
    usuario_id!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: "Publicacion",
        required: true,
    })
    publicacion_id!: Types.ObjectId;

    @Prop({
        required: true,
    })
    tipo!: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);