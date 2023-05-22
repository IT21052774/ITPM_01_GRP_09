import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true
        },
        contact_number: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        role: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
