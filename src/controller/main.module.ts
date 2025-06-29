import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schema/product.schema';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from '../schema/admin.schema';
import { AuthModule } from 'src/mid/auth/auth.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from '../schema/user.schema';
import { ShoppingController } from './users/shopping.controller';
import { ShoppingService } from './users/shopping.service';
import { Shopping, ShoppingSchema } from 'src/schema/shopping.schema';
import { RolesGuard } from '../mid/auth/roles.guard';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: User.name, schema: UserSchema },
      { name: Shopping.name, schema: ShoppingSchema },
    ]),
  ],
  controllers: [
    ProductsController,
    AdminController,
    OrderController,
    UsersController,
    ShoppingController, // Assuming ShoppingController is defined in users/shopping.controller.ts
  ],
  providers: [
    ProductsService,
    AdminService,
    OrderService,
    UsersService,
    ShoppingService,
  ],
})
export class MainModule {}
