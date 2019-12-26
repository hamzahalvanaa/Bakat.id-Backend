import { Schema, model, Document } from 'mongoose';
import moment from 'moment';

const BakatSchema = new Schema({
    message: { type: String, required: [true, 'Message required'] },
    images: { type: Array, required: false },
    coords: { type: String, required: false },
    created: { type: String, required: [true, 'Date required'] },
    likes: { type: Number, required: true, default: 0 },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required']
    }
});

BakatSchema.pre<BAKAT>('validate', function (next) {
    this.created = moment().format('L');
    next();
});

export interface BAKAT extends Document {
    message: string;
    images?: string[];
    coords?: string;
    created: string;
    user: string;
    likes?: number;
}

export const Bakat = model<BAKAT>('Bakat', BakatSchema);