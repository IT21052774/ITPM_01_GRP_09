import { Document } from 'mongoose';

export default interface IOrder extends Document {
    _id: string,
    item_id : string,
    order_placed_by : string,
    status : boolean,
    quantity : number
}
