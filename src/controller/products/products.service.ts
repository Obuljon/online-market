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

  async getAll({ page, limit }: { page: number; limit: number }): Promise<any> {
    // Ensure page and limit are positive numbers, with defaults
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const skip = (pageNumber - 1) * pageSize;

    try {
      // Fetch paginated projects
      const list = await this.productModel
        .find()
        .skip(skip)
        .limit(pageSize)
        .exec();

      // Get total count of projects
      const total = await this.productModel.countDocuments().exec();
      const totalPages = Math.ceil(total / pageSize);

      // Calculate length array (up to 6 page numbers, centered around current page)
      const maxPagesInLength = 6;
      let startPage = Math.max(
        1,
        pageNumber - Math.floor(maxPagesInLength / 2),
      );
      let endPage = Math.min(totalPages, startPage + maxPagesInLength - 1);

      // Adjust startPage if endPage is at the maximum
      if (endPage - startPage + 1 < maxPagesInLength) {
        startPage = Math.max(1, endPage - maxPagesInLength + 1);
      }

      // Generate length array
      const length = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      );

      return {
        list,
        length, // e.g., [11, 12, 13, 14, 15, 16] if pageNumber is 13
      };
    } catch (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }
  }

  async search({
    searchTerm,
    page,
    limit,
  }: {
    searchTerm: string;
    page: number;
    limit: number;
  }): Promise<any> {
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const skip = (pageNumber - 1) * pageSize;

    try {
      // Build search query: match name or category (case-insensitive)
      const query = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      };

      // Fetch matching projects
      const list = await this.productModel
        .find(query)
        .skip(skip)
        .limit(pageSize)
        .exec();

      // Get total count of matching projects
      const total = await this.productModel.countDocuments(query).exec();
      const totalPages = Math.ceil(total / pageSize);

      // Calculate length array (up to 6 page numbers, centered around current page)
      const maxPagesInLength = 6;
      let startPage = Math.max(
        1,
        pageNumber - Math.floor(maxPagesInLength / 2),
      );
      let endPage = Math.min(totalPages, startPage + maxPagesInLength - 1);

      if (endPage - startPage + 1 < maxPagesInLength) {
        startPage = Math.max(1, endPage - maxPagesInLength + 1);
      }

      const length = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      );

      return {
        list,
        length,
      };
    } catch (error) {
      throw new Error(`Failed to search projects: ${error.message}`);
    }
  }

  getById({ id }) {
    return this.productModel.findById(id).exec();
  }

  getOneName({ name }) {
    return this.productModel.findOne({ name }).exec();
  }
}
