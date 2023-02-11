import { Module } from '@nestjs/common';

import { ManufacturersModule } from './../manufacturers/manufacturers.module';
import { ProductsModule } from './../products/products.module';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { AsusService } from './services/asus.service';
import { HuaweiService } from './services/huawei.service';
import { LgService } from './services/lg.service';

@Module({
    controllers: [ScrapperController],
    providers: [ScrapperService, LgService, HuaweiService, AsusService],
    imports: [ManufacturersModule, ProductsModule],
})
export class ScrapperModule {}
