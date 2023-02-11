import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { Product } from './schema/product.schema';

@Controller('v1/products')
@ApiTags('Products')
export class ProductsController {
    constructor(public readonly productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'List all product models' })
    @ApiResponse({
        status: 200,
        description: 'successful',
        isArray: true,
        type: Product,
    })
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'fetch a product by id' })
    @ApiResponse({
        status: 200,
        description: 'successful',
        isArray: false,
        type: Product,
    })
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }
}
