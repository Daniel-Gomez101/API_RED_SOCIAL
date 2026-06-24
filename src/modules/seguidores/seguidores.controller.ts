import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeguidoresService } from "./seguidores.service";
import { CreateSeguidoresDto } from "./dto/create-seguidores.dto";
import { SearchSeguidoresDto } from "./dto/search-seguidores.dto";
import { UpdateSeguidoresDto } from "./dto/update-seguidores.dto";

@ApiTags("Seguidores")
@Controller("Seguidores")
export class SeguidoresController {

    constructor(
        private readonly service: SeguidoresService,
    ) {}

    @Post()
    create(@Body() dto: CreateSeguidoresDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(@Query() search: SearchSeguidoresDto) {
        return this.service.findAll(search);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() dto: UpdateSeguidoresDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.service.remove(id);
    }
}