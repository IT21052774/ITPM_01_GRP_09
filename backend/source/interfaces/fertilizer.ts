import { Document } from 'mongoose';

export default interface IHarvest extends Document {
    _id: string,
    price: number,
    status: boolean,
    name: string,
    image_path: string,
}
