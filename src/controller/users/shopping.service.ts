import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shopping } from 'src/schema/shopping.schema';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectModel(Shopping.name)
    private readonly shoppingModel: Model<Shopping>,
  ) {}

  // Yangi shopping hujjati yaratish
  async create(data: {
    user_id: Types.ObjectId;
    product_list: Types.ObjectId[];
    total_price: number;
    payment_made?: boolean;
    delivered?: boolean;
  }) {
    const shopping = new this.shoppingModel({
      ...data,
      payment_made: data.payment_made ?? false,
      delivered: data.delivered ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return shopping.save();
  }

  // Barcha shopping hujjatlarini olish
  async findAll() {
    return this.shoppingModel.find().exec();
  }

  // ID bo'yicha shopping hujjatini olish
  async findById(id: string) {
    return this.shoppingModel.findById(id).exec();
  }

  // ID bo'yicha shopping hujjatini yangilash
  async update(id: string, updateData: Partial<Shopping>) {
    updateData.updatedAt = new Date();
    return this.shoppingModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // ID bo'yicha shopping hujjatini o'chirish
  async delete(id: string) {
    return this.shoppingModel.findByIdAndDelete(id).exec();
  }
}
