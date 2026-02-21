import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./entities/products.entity";

@Injectable()
export class ProductsService {
    constructor(@Inject() private productRepo: Repository<Product>) {

    }

}
