import { Test, TestingModule } from '@nestjs/testing';
import { AddCoinService } from './add-coin.service';

describe('AddCoinService', () => {
  let service: AddCoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCoinService],
    }).compile();

    service = module.get<AddCoinService>(AddCoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
