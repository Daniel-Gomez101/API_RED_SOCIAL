import { PartialType } from '@nestjs/swagger';
import { CreatePublicacionDto } from './create-publicaciones.dto';

export class UpdatePublicacionDto extends PartialType(CreatePublicacionDto) {}