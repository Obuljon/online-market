import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Request } from 'express';
import { OrderDTO } from '../dtos/orderDTO';
import { ProductsService } from '../products/products.service';

@Controller('api/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('getall/:page/:limit')
  async getAllOrders(@Param() params: any) {
    const { page, limit } = params;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      throw new BadRequestException('Invalid page or limit value');
    }

    return this.productsService.getAll({
      page: pageNum,
      limit: limitNum,
    });
  }

  @Get('getbyid/:id')
  async getOrderById(@Param('id') id: string) {
    return this.productsService.getById({ id });
  }

  @Get('cart/:page/:limit')
  async getCartPaginated(
    @Req() req: Request,
    @Param('page') page: string,
    @Param('limit') limit: string,
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      throw new BadRequestException('Invalid page or limit value');
    }

    return this.orderService.getCartPaginated(req.session, pageNum, limitNum);
  }

  @Post('addcart')
  async addToCart(@Req() req: Request, @Body() body: OrderDTO) {
    return this.orderService.addToCart(req.session, body);
  }

  @Delete('deletecart')
  async deleteCart(@Req() req: Request) {
    return this.orderService.deleteCart(req.session);
  }

  @Delete('deletecart/:id')
  async deleteFromCart(@Req() req: Request, @Param('id') id: string) {
    return this.orderService.deleteFromCart(req.session, id);
  }
}
