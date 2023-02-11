import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer, ManufacturerSchema } from './schema/manufacturer.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Manufacturer.name, schema: ManufacturerSchema }])],
    controllers: [ManufacturersController],
    providers: [ManufacturersService],
    exports: [ManufacturersService],
})
export class ManufacturersModule {}
