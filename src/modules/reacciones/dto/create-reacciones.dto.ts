import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateReaccionesDto {

    @ApiProperty({
        description: "ID del usuario",
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    usuario_id!: string;

    @ApiProperty({
        description: "ID de la publicación",
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    publicacion_id!: string;

    @ApiProperty({
        description: "Tipo de reacción",
        example: "Like"
    })
    @IsString()
    @IsNotEmpty()
    tipo!: string;
}