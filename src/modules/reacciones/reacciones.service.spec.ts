import { Test, TestingModule } from '@nestjs/testing';
import { ReaccionesService } from './reacciones.service';

describe('ReaccionesService', () => {
  let service: ReaccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReaccionesService],
    }).compile();

    service = module.get<ReaccionesService>(ReaccionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
