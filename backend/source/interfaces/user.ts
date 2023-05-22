import { Document } from 'mongoose';

export default interface IUser extends Document {
    _id: string,
    name: string,
    email: string,
    address: string,
    contact_number: string
    status : boolean,
    password: string,
    role: string
}
