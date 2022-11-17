import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddCoinService } from './add-coin.service';
import { AddCoin } from './entities/add-coin.entity';
import { AddCoinController } from './add-coin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AddCoin])],
  controllers: [AddCoinController],
  providers: [AddCoinService]
})
export class AddCoinModule {}
