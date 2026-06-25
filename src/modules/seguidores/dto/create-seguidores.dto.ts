import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateSeguidoresDto {

    @ApiProperty({
        description: "ID del usuario seguidor",
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    usuario_id!: string;

    @ApiProperty({
        description: "ID del usuario seguido",
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    seguido_id!: string;
}