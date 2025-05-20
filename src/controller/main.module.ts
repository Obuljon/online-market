import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schema/product.schema';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from '../schema/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/mid/auth/auth.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [ProductsController, AdminController, OrderController],
  providers: [ProductsService, AdminService, OrderService],
})
export class MainModule {}
