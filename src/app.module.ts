import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { ReaccionesService } from './modules/reacciones/reacciones.service';
import { ReaccionesController } from './modules/reacciones/reacciones.controller';
import { ReaccionesModule } from './modules/reacciones/reacciones.module';
import { SeguidoresService } from './modules/seguidores/seguidores.service';
import { SeguidoresModule } from './modules/seguidores/seguidores.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGODB_URI as string),
        RolesModule,
        UsuariosModule,
        PublicacionesModule,
        ComentariosModule,
        ReaccionesModule,
        SeguidoresModule,
    ],
    controllers: [AppController, ReaccionesController],
    providers: [AppService, ReaccionesService, SeguidoresService],
})
export class AppModule {}