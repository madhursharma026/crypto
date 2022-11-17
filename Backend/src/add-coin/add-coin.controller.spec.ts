import { Test, TestingModule } from '@nestjs/testing';
import { AddCoinController } from './add-coin.controller';
import { AddCoinService } from './add-coin.service';

describe('AddCoinController', () => {
  let controller: AddCoinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddCoinController],
      providers: [AddCoinService],
    }).compile();

    controller = module.get<AddCoinController>(AddCoinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
