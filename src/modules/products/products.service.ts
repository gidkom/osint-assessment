import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly _productModel: Model<ProductDocument>,
    ) {}

    async create(createProductDto: CreateProductDto[]): Promise<void> {
        await this._productModel.insertMany(createProductDto);
    }

    findAll(): Promise<Product[]> {
        return this._productModel.find().populate('manufacturer', 'name').lean().exec();
    }

    findOne(id: string): Promise<Product> {
        return this._productModel.findById(id).lean().exec();
    }
}
