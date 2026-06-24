import {
    IsOptional,
    IsString,
    IsMongoId,
    IsBoolean,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SearchPublicacionDto {
    @ApiPropertyOptional({
        example: 'Hola',
    })
    @IsOptional()
    @IsString()
    contenido?: string;

    @ApiPropertyOptional({
        example: '507f1f77bcf86cd799439011',
    })
    @IsOptional()
    @IsMongoId()
    usuario_id?: string;

    @ApiPropertyOptional({
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    activo?: boolean;
}