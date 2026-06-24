import { IsOptional } from "class-validator";

export class SearchSeguidoresDto {

    @IsOptional()
    usuario_id?: string;

    @IsOptional()
    seguido_id?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}