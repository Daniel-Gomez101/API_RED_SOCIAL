import {
    IsNotEmpty,
    IsString,
    IsMongoId,
    MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicacionDto {
    @ApiProperty({
        example: 'Hola a todos, esta es mi primera publicación',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500, { message: 'El contenido no puede superar los 500 caracteres' })
    contenido!: string;

    @ApiProperty({
        example: '12345567892812378',
    })
    @IsMongoId({ message: 'usuario_id debe ser un ObjectId válido' })
    @IsNotEmpty()
    usuario_id!: string;
}