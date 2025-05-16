import { Injectable } from '@nestjs/common';
import { Product } from 'src/schema/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create({
    name,
    description,
    price,
    category,
    stock,
  }): Promise<any | null> {
    const product = new this.productModel({
      name,
      description,
      price,
      category,
      stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return product.save();
  }

  updateById({ _id }, { name, description, category, stock }) {
    return this.productModel.findByIdAndUpdate(
      { _id },
      { name, description, category, stock, updatedAt: new Date() },
    );
  }

  deleteById({ _id }): void {
    this.productModel.findByIdAndDelete(_id).exec();
  }

  getAll() {}

  getById({ id }) {
    return this.productModel.findById(id).exec();
  }

  getOneName({ name }) {
    return this.productModel.findOne({ name }).exec();
  }
}
