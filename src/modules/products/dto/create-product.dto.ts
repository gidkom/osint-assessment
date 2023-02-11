import { Types } from 'mongoose';

export class CreateProductDto {
    model: string;
    specs: string;
    price?: string;
    manufacturer?: Types.ObjectId;
}
