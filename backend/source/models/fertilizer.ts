import mongoose, { Schema } from 'mongoose';
import IHarvest from '../interfaces/harvest';

const FertlizerSchema: Schema = new Schema(
    {
        unit_price : {
            type : Number,
            required : true
        },
        status : {
            type : Boolean,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        measurement_unit : {
            type : String,
            required : true
        },
        image_path : {
            type : String,
            required : true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IHarvest>('Fertilizer', FertlizerSchema);
