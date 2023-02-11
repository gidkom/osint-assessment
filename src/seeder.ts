import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { seeder } from 'nestjs-seeder';

import {
    Manufacturer,
    ManufacturerSchema,
} from './modules/manufacturers/schema/manufacturer.schema';
import { ManufacturersSeeder } from './modules/manufacturers/seeders/manufacturers.seeder';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

seeder({
    imports: [
        MongooseModule.forRootAsync({
            imports: [SharedModule, CommandModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ({
                    uri: configService.get('DB_URL'),
                } as MongooseModuleAsyncOptions),
        }),
        MongooseModule.forFeature([{ name: Manufacturer.name, schema: ManufacturerSchema }]),
    ],
}).run([ManufacturersSeeder]);
