import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { Types } from 'mongoose';

@Controller('api/shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  // Yangi shopping hujjati yaratish
  @Post('create')
  async create(@Req() req: Request) {
    console.log(req);
    return 'ok';
  }

  // Barcha shopping hujjatlarini olish
  @Get('all')
  async findAll() {
    return this.shoppingService.findAll();
  }

  // ID bo'yicha shopping hujjatini olish
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.shoppingService.findById(id);
  }

  // ID bo'yicha shopping hujjatini yangilash
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.shoppingService.update(id, updateData);
  }

  // ID bo'yicha shopping hujjatini o'chirish
  //   @Delete(':id')
  //   async delete(@Param('id') id: string) {
  //     return this.shoppingService.delete(id);
  //   }
}
