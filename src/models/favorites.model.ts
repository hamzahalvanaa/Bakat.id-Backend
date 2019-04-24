import { Schema, model, Document } from 'mongoose';

const FavoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User required'] },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: [true, 'Post required'] }
});

export interface FAVORITE extends Document {
  user: string;
  post: string;
}

export const Favorite = model<FAVORITE>('Favorite', FavoriteSchema);