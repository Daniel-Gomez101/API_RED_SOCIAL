import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from 'src/common/helpers/response.helpers';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: 
        Model<RoleDocument>,
    ) {}

    /**  
     * metodo para crear un nuevo rol
    */
    async create(
        dto:CreateRoleDto,
    ){
        const role=
        await this.roleModel.create(dto);
        
        return ResponseHelper.success(
            role,
            201,
        );
    }

    /**  
    
        * metodo para obtener todos los roles
    
    */
    async findAll() {
        const roles = 
        await this.roleModel.find({activo:true});
        return ResponseHelper.success(roles);
    }
    /**
     * consulta roles eliminados logicamente
     */

    async findInactive(){
        const roles = await this.roleModel.find({activo:false});
        return ResponseHelper.success(roles);
    }


    /**  
     * metodo para actualizar un rol
    */
    async findOne(id: string) {
        const role = await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }
        return role;
    }

    /**
     * metodo para actualizar un rol
     */

    async update(id: string, dto: UpdateRoleDto) {
        const role = await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }
        const updatedRole = await this.roleModel.findByIdAndUpdate(id, dto,{new:true});
        return ResponseHelper.success(updatedRole);
    }


    /**
     * actualizacion Parcial
     */

    async updatePartial(id: string, dto: UpdateRoleDto) {
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROl no encontrado');
        }

        const updateRole= await this.roleModel.findByIdAndUpdate(id,{$set:dto,},{new: true})

        return ResponseHelper.success(updateRole,);


    }

/*  
 * Eliminacion logica
*/

    async remove(id:string){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('rol no encontrado')
        }
        const deleteRole= await this.roleModel.findByIdAndUpdate(id,{activo:false,},{new:true,});

        return ResponseHelper.success(deleteRole);
    }


/**
 * restaurar rol eliminado
 */
async restore(id: string) {
    const role = await this.roleModel.findByIdAndUpdate(
        id,
        { activo: true },
        { new: true },
    );

    if (!role) {
        throw new NotFoundException('Rol no encontrado');
    }
    const restoreRole= await this.roleModel.findByIdAndUpdate(id,{activo:true},{new:true});
    return ResponseHelper.success(restoreRole);
    }
}