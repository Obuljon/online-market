import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/productDTO';
import { AuthGuard } from 'src/mid/auth/auth.guard';
import { RolesGuard } from 'src/mid/auth/roles.guard';
import { Roles } from 'src/decorator';


@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() body: CreateProductDTO) {
    const { name } = body;
    const product = await this.productsService.getOneName({ name });
    if (product) {
      throw new BadRequestException('Product already exists');
    }

    return this.productsService.create(body);
  }

  @Put('update/:id')
  updateProduct(@Body() body: UpdateProductDTO, @Param() param) {
    const { id } = param;
    const product = this.productsService.getById({ id });
    const { name } = body;
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (name) {
      const existingProduct = this.productsService.getOneName({ name });
      if (existingProduct != null) {
        throw new BadRequestException('Product already exists');
      }
    }

    return this.productsService.updateById({ _id: id }, body);
  }

  @Delete('delete/:id')
  deleteProduct(@Param() param) {
    const { id } = param;
    return this.productsService.deleteById({ _id: id });
  }

  @Get('search/:searchTerm/:page/:limit')
  async search(@Param() param) {
    const { searchTerm, page, limit } = param;
    return this.productsService.search({ searchTerm, page, limit });
  }

  @Get('getall/:page/:limit')
  getAllProducts(@Param() param) {
    const { page, limit } = param;
    return this.productsService.getAll({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get('getone/:name')
  async getByName(@Param() param) {
    const { name } = param;
    const data = await this.productsService.getOneName({ name });
    if (!data) {
      throw new NotFoundException('Product not found');
    }
    return data;
  }

  @Get('getbyid/:id')
  async getOneProduct(@Param() param) {
    const { id } = param;
    const data = await this.productsService.getById({ id });
    if (!data) {
      throw new NotFoundException('Product not found');
    }
    return data;
  }
  @Get('test')
  test() {
    return 'test';
  }
}
