import { Module } from '@nestjs/common';
import { SeguidoresController } from './seguidores.controller';

@Module({
  controllers: [SeguidoresController]
})
export class SeguidoresModule {}
