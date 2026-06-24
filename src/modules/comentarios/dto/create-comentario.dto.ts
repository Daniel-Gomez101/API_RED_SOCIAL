import {
    IsNotEmpty,
    IsString,
    IsMongoId,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
    @ApiProperty({
        example: 'Excelente publicación!',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(300, { message: 'El comentario no puede superar los 300 caracteres' })
    contenido!: string;

    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
    })
    @IsMongoId({ message: 'usuario_id debe ser un ObjectId válido' })
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
    })
    @IsMongoId({ message: 'publicacion_id debe ser un ObjectId válido' })
    @IsNotEmpty()
    publicacion_id!: string;
}