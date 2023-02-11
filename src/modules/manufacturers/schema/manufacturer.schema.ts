/* eslint-disable @typescript-eslint/tslint/config */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type ManufacturerDocument = HydratedDocument<Manufacturer>;

@Schema()
export class Manufacturer {
    @ApiProperty()
    _id: Types.ObjectId;

    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    url: string;

    @ApiProperty()
    @Prop({ default: Date.now })
    createdAt: Date;

    @ApiProperty()
    @Prop({ default: Date.now })
    updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
