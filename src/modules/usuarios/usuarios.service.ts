import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument} from './schemas/user.schema';
import {Model} from 'mongoose'
import { CreateUserDto } from "./dto/create-user.dto";
import  * as bcrypt from 'bcrypt';
import { ResponseHelper } from "src/common/helpers/response.helpers";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsuariosService{
    constructor(
        @InjectModel(User.name)
        private readonly userModel:
        Model<UserDocument>
    ){}

    /*
    * Metodo para la creacion de usuarios 
    */


    async create(dto: CreateUserDto){
        // Verificacion de correo
        const exists= await this.userModel.findOne({correo:dto.correo})

        // si existe correo
        if(exists){
            throw new BadRequestException('Correo ya registrado')
        }

        const hashedPassword = await bcrypt.hash(dto.password,10);

        const  user = await this.userModel.create({...dto,password:hashedPassword});

        return ResponseHelper.success(user,201);

    }

    /*
    * Consulta Usuario
    */

    async findAll(search:SearchUserDto){
    // crear filtro
    const filter: any={activo:true}

    // FILTROPOR NOMBRE 

        if(search.nombre){
            filter.nombre={
                $regex:search.nombre,
                $options:'i'
            };
        }

        const page= Number(search.page) || 1;
        const limit = Number(search.limit) || 10;
        // consulta

        const data = await this.userModel.find(filter).populate('rol_id').skip((page-1)*limit).limit(limit);
        // Contador de documentos = contador de usuarios
        const total = await this.userModel.countDocuments(filter)

        return ResponseHelper.success({total, page, limit, data});

    }

    /**
     *  consulta por id de usuario 
     */

    async findOne(id:string){
        const user = await this.userModel.findById(id).populate('rol_id');

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }
        return ResponseHelper.success(user)
    }

    /**
     *  Actualizacion de horario
     */

    async update(id:string, dto:UpdateUserDto){
        const user = await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('no se encontro el usuario');
        }
        if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
    }

        const updateuser = await this.userModel.findByIdAndUpdate(id, dto,{new:true})

        return ResponseHelper.success(updateuser)
    }
    /**
     *  Soft delete
     */

    async remove(id:string){
        const user= await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }

        const deleteUser = await this.userModel.findByIdAndUpdate(id,{activo:false},{new:true});

        return ResponseHelper.success(deleteUser);
    }
}