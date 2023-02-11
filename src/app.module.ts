import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';

import { contextMiddleware } from './middlewares';
import { ManufacturersModule } from './modules/manufacturers/manufacturers.module';
import {
    Manufacturer,
    ManufacturerSchema,
} from './modules/manufacturers/schema/manufacturer.schema';
import { ProductsModule } from './modules/products/products.module';
import { Product, ProductSchema } from './modules/products/schema/product.schema';
import { ScrapperModule } from './modules/scrapper/scrapper.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [SharedModule, CommandModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ({
                    uri: configService.get('DB_URL'),
                } as MongooseModuleAsyncOptions),
        }),
        MongooseModule.forFeatureAsync([
            {
                name: Manufacturer.name,
                useFactory: () => {
                    const schema = ManufacturerSchema;
                    schema.post('find', function (doc) {
                        if (Array.isArray(doc)) {
                            doc.map((item) => {
                                item._id = item._id.toHexString();
                                return item;
                            });
                        }
                    });

                    return schema;
                },
            },
            {
                name: Product.name,
                useFactory: () => {
                    const schema = ProductSchema;
                    schema.post('find', function (doc) {
                        if (Array.isArray(doc)) {
                            doc.map((item) => {
                                item._id = item._id.toHexString();
                                return item;
                            });
                        }
                    });

                    return schema;
                },
            },
        ]),
        ManufacturersModule,
        ProductsModule,
        ScrapperModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
