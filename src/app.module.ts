import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.module';
import { ComentariosService } from './modules/comentarios/comentarios.service';
import { ComentariosController } from './modules/comentarios/comentarios.controller';
import { ComentariosModule } from './modules/comentarios/comentarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    RolesModule,
    UsuariosModule,
    PublicacionesModule,
    ComentariosModule,
  ],
  controllers: [AppController, ComentariosController],
  providers: [AppService, ComentariosService],
})
export class AppModule {}
