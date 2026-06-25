import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SeguidoresController } from "./seguidores.controller";
import { SeguidoresService } from "./seguidores.service";
import { Seguidor, SeguidorSchema } from "./schema/seguidores.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Seguidor.name,
                schema: SeguidorSchema,
            },
        ]),
    ],
    controllers: [SeguidoresController],
    providers: [SeguidoresService],
})
export class SeguidoresModule {}