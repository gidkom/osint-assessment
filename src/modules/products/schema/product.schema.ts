/* eslint-disable @typescript-eslint/tslint/config */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';

import { Manufacturer } from './../../manufacturers/schema/manufacturer.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @ApiProperty()
    _id: Types.ObjectId;

    @ApiProperty()
    @Prop()
    model: string;

    @ApiProperty()
    @Prop()
    price: string;

    @ApiProperty()
    @Prop()
    specs: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' })
    manufacturer: Manufacturer;

    @ApiProperty()
    @Prop({ default: Date.now })
    createdAt: Date;

    @ApiProperty()
    @Prop({ default: Date.now })
    updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProductSchema = SchemaFactory.createForClass(Product);
