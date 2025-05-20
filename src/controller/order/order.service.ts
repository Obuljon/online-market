// order.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CartItem, OrderDTO } from '../dtos/orderDTO';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrderService {
  constructor(private readonly productService: ProductsService) {}
  private readonly CART_SIZE_LIMIT = 100; // Could be moved to config

  // Initialize cart if not present
  private initializeCart(session: any): CartItem[] {
    if (!session.cart) {
      session.cart = [];
    }
    return session.cart;
  }

  // Get paginated cart items
  getCartPaginated(
    session: any,
    page: number,
    limit: number,
  ): { list: CartItem[]; length: number[]; page: number; totalPages: number } {
    const cart = this.initializeCart(session);

    const totalItems = cart.length;
    const totalPages = Math.ceil(totalItems / limit);
    const safePage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (safePage - 1) * limit;
    const endIndex = startIndex + limit;

    const list = cart.slice(startIndex, endIndex);

    // Pagination window
    const windowSize = 6;
    const halfWindow = Math.floor(windowSize / 2);
    let startPage = Math.max(1, safePage - halfWindow);
    let endPage = startPage + windowSize - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - windowSize + 1);
    }

    const length = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );

    return { list, length, page: safePage, totalPages };
  }

    // Check if product exists
  private async checkProductExists(id: string): Promise<void> {
    const product = await this.productService.getById({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }


  // Check cart size limit
  private checkCartSizeLimit(cart: CartItem[]): void {
    if (cart.length >= this.CART_SIZE_LIMIT) {
      throw new BadRequestException(`Cart cannot exceed ${this.CART_SIZE_LIMIT} items`);
    }
  }

    // Add new item to cart
  private addNewCartItem(cart: CartItem[], order: OrderDTO): void {
    cart.push({ _id: order._id, number: order.number });
  }

  // Update existing item in cart
  private updateCartItem(existing: CartItem, number: number): void {
    existing.number = number;
  }

  // Remove item from cart
  private removeCartItem(cart: CartItem[], id: string): boolean {
    const originalLength = cart.length;
    cart = cart.filter((item: CartItem) => item._id !== id);
    return cart.length < originalLength;
  }


   // Add or update item in cart, or remove if number is 0
  async addToCart(session: any, order: OrderDTO): Promise<{ message: string }> {
    const cart = this.initializeCart(session);
    const existing = cart.find((item: CartItem) => item._id === order._id);

    if (order.number === 0) {
      if (existing) {
        session.cart = cart.filter((item: CartItem) => item._id !== order._id);
        return { message: 'Mahsulot savatchadan o‘chirildi' };
      }
      return { message: 'Mahsulot savatchada topilmadi' };
    }

    if (existing) {
      this.updateCartItem(existing, order.number);
    } else {
      await this.checkProductExists(order._id);
      this.checkCartSizeLimit(cart);
      this.addNewCartItem(cart, order);
    }

    return { message: 'Mahsulot savatchaga qo‘shildi' };
  }


  // Delete entire cart
  deleteCart(session: any): { message: string; cart: CartItem[] } {
    const cart = this.initializeCart(session);
    session.cart = [];
    return { message: 'Savatchadagi barcha mahsulotlar o‘chirildi', cart: [] };
  }

  // Delete item from cart
  deleteFromCart(session: any, id: string): { message: string } {
    if (!id) {
      throw new BadRequestException('Invalid item ID');
    }
    const cart = this.initializeCart(session);
    const isDeleted = this.removeCartItem(cart, id);
    session.cart = cart;
    return {
      message: isDeleted ? 'Mahsulot savatchadan o‘chirildi' : 'Mahsulot topilmadi',
    };
  }

  // Placeholder for getAllOrders
  async getAllOrders(): Promise<any[]> {
    // Implement actual logic, e.g., fetch from database
    return [];
  }

  // Placeholder for getOrderById
  async getOrderById(id: string): Promise<any> {
    // Implement actual logic, e.g., fetch from database
    return null;
  }
}
