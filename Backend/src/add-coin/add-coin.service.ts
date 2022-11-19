import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCoin } from './entities/add-coin.entity';

@Injectable()
export class AddCoinService {
  constructor(@InjectRepository(AddCoin) private repo: Repository<AddCoin>) { }

  async create(gettingCoinId, gettingCoinName, gettingCoinPrice, gettingcoinQty) {
    const user = await this.repo.findOne({where: {coinName: gettingCoinName}});
    if (user) {
      let coinName = gettingCoinName
      let coinPrice = gettingCoinPrice
      let coinId = gettingCoinId
      let coinQty = (Number(user.coinQty) + Number(gettingcoinQty))
      Object.assign(user, { coinName, coinPrice, coinQty, coinId });
      user.totalPrice = (Number(user.totalPrice) + (Number(gettingCoinPrice) * Number(gettingcoinQty)))
      return this.repo.save(user);
    }
    let coinName = gettingCoinName
    let coinPrice = gettingCoinPrice
    let coinQty = gettingcoinQty
    let coinId = gettingCoinId
    const addNewCoin = this.repo.create({ coinId, coinName, coinPrice, coinQty });
    addNewCoin.totalPrice = gettingCoinPrice * gettingcoinQty
    return this.repo.save(addNewCoin);
  }

  findAll(): Promise<AddCoin[]> {
    return this.repo.find();
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
