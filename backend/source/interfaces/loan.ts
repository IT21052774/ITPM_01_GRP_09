import { Document } from 'mongoose';

export default interface ILoan extends Document {
    _id: string,
    requested_by : string,
    reason : string,
    special_notice : string,
    status : boolean,
    amount : number
}
