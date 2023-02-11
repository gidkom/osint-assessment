import { Injectable } from '@nestjs/common';

import { ManufacturersService } from './../manufacturers/manufacturers.service';
import { CreateProductDto } from './../products/dto/create-product.dto';
import { ProductsService } from './../products/products.service';
import { AsusService } from './services/asus.service';
import { HuaweiService } from './services/huawei.service';
import { LgService } from './services/lg.service';

@Injectable()
export class ScrapperService {
    browser: any;
    page: any;

    constructor(
        public lgService: LgService,
        public huaweiService: HuaweiService,
        public asusService: AsusService,
        public productsService: ProductsService,
        public manufacturersService: ManufacturersService,
    ) { }

    async run() {
        const manufacturers = await this.manufacturersService.findAll();
        for (const m of manufacturers) {
            await this.scrapeProductList(m.url, m.name, m._id);
        }
    }

    async scrapeProductList(url, manufacturer, id) {
        let result: CreateProductDto[] = [];
        switch (manufacturer) {
            case 'LG':
                result = await this.lgService.scrape(url);
                break;
            case 'Huawei':
                result = await this.huaweiService.scrape(url);
                break;
            case 'Asus':
                result = await this.asusService.scrape(url);
                break;
            default:
        }

        result.map((res) => (res.manufacturer = id));
        // save product
        await this.productsService.create(result);
    }
}
