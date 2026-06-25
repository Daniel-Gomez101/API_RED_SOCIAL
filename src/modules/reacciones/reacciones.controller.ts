import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReaccionesService } from "./reacciones.service";
import { CreateReaccionesDto } from "./dto/create-reacciones.dto";
import { SearchReaccionesDto } from "./dto/search-reacciones.dto";
import { UpdateReaccionesDto } from "./dto/update-reacciones.dto";

@ApiTags("Reacciones")
@Controller("Reacciones")
export class ReaccionesController {

    constructor(
        private readonly service: ReaccionesService,
    ) {}

    @Post()
    create(@Body() dto: CreateReaccionesDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(@Query() search: SearchReaccionesDto) {
        return this.service.findAll(search);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() dto: UpdateReaccionesDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.service.remove(id);
    }
}