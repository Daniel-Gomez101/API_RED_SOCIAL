import { Test, TestingModule } from '@nestjs/testing';
import { ReaccionesController } from './reacciones.controller';

describe('ReaccionesController', () => {
  let controller: ReaccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReaccionesController],
    }).compile();

    controller = module.get<ReaccionesController>(ReaccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
