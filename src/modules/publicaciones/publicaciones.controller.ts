import { Body, Controller, Post, Get, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicaciones.dto';
import { SearchPublicacionDto } from './dto/search-publicaciones.dto';
import { UpdatePublicacionDto } from './dto/update-publicaciones.dto';

@ApiTags('Publicaciones')
@Controller('publicaciones')
export class PublicacionesController {
    constructor(
        private readonly service: PublicacionesService,
    ) {}

    @Post()
    create(@Body() dto: CreatePublicacionDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(@Query() query: SearchPublicacionDto) {
        return this.service.findAll(query);
    }

    @Get('inactivas')
    findInactive() {
        return this.service.findInactive();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePublicacionDto) {
        return this.service.update(id, dto);
    }

    @Patch(':id')
    updatePartial(@Param('id') id: string, @Body() dto: UpdatePublicacionDto) {
        return this.service.updatePartial(id, dto);
    }

    @Patch(':id/restore')
    restore(@Param('id') id: string) {
        return this.service.restore(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}