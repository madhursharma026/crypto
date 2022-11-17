import { PartialType } from '@nestjs/mapped-types';
import { CreateAddCoinDto } from './create-add-coin.dto';

export class UpdateAddCoinDto extends PartialType(CreateAddCoinDto) {}
