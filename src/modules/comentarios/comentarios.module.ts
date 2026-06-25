import { Module } from '@nestjs/common';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comentario, ComentarioSchema } from './schemas/comentario.schema';

@Module({
    controllers: [ComentariosController],
    providers: [ComentariosService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Comentario.name,
                schema: ComentarioSchema,
            },
        ]),
    ],
})
export class ComentariosModule{}