import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddCoinService } from './add-coin.service';
import { CreateAddCoinDto } from './dto/create-add-coin.dto';
import { UpdateAddCoinDto } from './dto/update-add-coin.dto';

@Controller('add-coin')
export class AddCoinController {
  constructor(private readonly addCoinService: AddCoinService) {}

  @Post()
  async addCoin(@Body() body: CreateAddCoinDto) {
      const addNewCoin = await this.addCoinService.create(body.coinId, body.coinName, body.coinPrice, body.coinQty);
      return addNewCoin;
  }

  @Get()
  findAll() {
    return this.addCoinService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.addCoinService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAddCoinDto: UpdateAddCoinDto) {
  //   return this.addCoinService.update(+id, updateAddCoinDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.addCoinService.remove(+id);
  // }
}
