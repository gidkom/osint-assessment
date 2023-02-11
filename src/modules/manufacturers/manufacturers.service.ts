import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDto } from './dtos/create.dto';
import { Manufacturer, ManufacturerDocument } from './schema/manufacturer.schema';

@Injectable()
export class ManufacturersService {
    constructor(
        @InjectModel(Manufacturer.name)
        private readonly _manufacturerModel: Model<ManufacturerDocument>,
    ) {}

    async create(data: CreateDto): Promise<void> {
        const createdManufacturer = new this._manufacturerModel(data);
        await createdManufacturer.save();
    }

    async findAll(): Promise<Manufacturer[]> {
        return this._manufacturerModel.find().lean().exec();
    }

    async findByName(name: string): Promise<Manufacturer> {
        return this._manufacturerModel.findOne({ name }).lean().exec();
    }
}
