import { PartialType } from "@nestjs/swagger";
import { CreateSeguidoresDto } from "./create-seguidores.dto";

export class UpdateSeguidoresDto extends PartialType(CreateSeguidoresDto) {}