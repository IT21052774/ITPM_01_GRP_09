import { Document } from 'mongoose';

export default interface IHarvest extends Document {
    _id: string,
    unit_price: number,
    status: boolean,
    name: string,
    measurement_unit: string,
    image_path: string,
}
