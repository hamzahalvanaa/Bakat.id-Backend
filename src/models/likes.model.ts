import { Schema, model, Document } from 'mongoose';

const LikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User required'] },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: [true, 'Post required'] }
});

export interface LIKE extends Document {
  user: string;
  post: string;
}

export const Like = model<LIKE>('Like', LikeSchema);