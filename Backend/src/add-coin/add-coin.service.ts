import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCoin } from './entities/add-coin.entity';

@Injectable()
export class AddCoinService {
  constructor(@InjectRepository(AddCoin) private repo: Repository<AddCoin>) { }

  create(coinName, coinPrice, coinQty) {
    const addNewCoin = this.repo.create({ coinName, coinPrice, coinQty });
    addNewCoin.totalPrice = coinPrice * coinQty
    return this.repo.save(addNewCoin);
  }

  findAll(): Promise<AddCoin[]> {
    return this.repo.find(
      { select: ['totalPrice'] }
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} addCoin`;
  // }

  // update(id: number, updateAddCoinDto: UpdateAddCoinDto) {
  //   return `This action updates a #${id} addCoin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} addCoin`;
  // }
}
