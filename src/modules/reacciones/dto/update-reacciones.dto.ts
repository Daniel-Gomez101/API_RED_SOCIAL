import { PartialType } from "@nestjs/swagger";
import { CreateReaccionesDto } from "./create-reacciones.dto";

export class UpdateReaccionesDto extends PartialType(CreateReaccionesDto) {}