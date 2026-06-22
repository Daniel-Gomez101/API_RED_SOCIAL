import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Body, Get, Post, Param, Put, Patch, Delete } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly service:
        RolesService,
    

){}

/** 
     * crear un rol 
 */
    @Post()
    create(
        @Body() dto: CreateRoleDto,
            
        
) {
        return this.service.create(dto);
            
        
    /**
     * consultar roles
     */
    }
    @Get()
    findAll(){
        return this.service.findAll();
    }

    /**
     * consultar roles inactivos
     */

    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }





    /**
     * Buscar Rol por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id:string,
    ){
        return this.service.findOne(id,);
    }

/**
     * actualizar rol (reemplazo completo)
     */
    @Put(':id')
    replace(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ) {
        return this.service.update(id, dto);
    }

    /** 
     * actualizar rol (actualizacion parcial)
     */
    @Patch(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * eliminar un rol
     */
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.service.remove(id);
    }

    /**
     * Restaurar rol inactivo
     */
    
}



