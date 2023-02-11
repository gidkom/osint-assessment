import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';

import { Manufacturer } from '../schema/manufacturer.schema';

@Injectable()
export class ManufacturersSeeder implements Seeder {
    constructor(
        @InjectModel(Manufacturer.name) public readonly manufacturer: Model<Manufacturer>,
    ) {}

    async seed(): Promise<any> {
        const manufacturers = [
            {
                name: 'LG',
                url: 'https://www.lg.com/us/laptops',
            },
            {
                name: 'Huawei',
                url: 'https://consumer.huawei.com/en/laptops',
            },
            {
                name: 'Asus',
                url: 'https://www.asus.com/mobile/phones/all-series/filter?Series=ROG-Phone',
            },
        ];

        // Insert into the database.
        const count = await this.manufacturer.countDocuments({});
        if (!count) return this.manufacturer.insertMany(manufacturers);
    }

    async drop(): Promise<any> {
        return this.manufacturer.deleteMany({});
    }
}
