import mongoose, { Schema } from 'mongoose';
import IOrder from '../interfaces/order';

const OrderSchema: Schema = new Schema(
    {
        item_id : {
            type : String,
            required : true
        },
        status : {
            type : Boolean,
            required : true
        },
        order_placed_by : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
