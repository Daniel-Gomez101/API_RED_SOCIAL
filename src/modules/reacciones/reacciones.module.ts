import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReaccionesController } from "./reacciones.controller";
import { ReaccionesService } from "./reacciones.service";
import { Reaccion, ReaccionSchema } from "./schemas/reacciones.schema";

@Module({
    controllers: [ReaccionesController],
    providers: [ReaccionesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Reaccion.name,
                schema: ReaccionSchema,
            },
        ]),
    ],
})
export class ReaccionesModule {}