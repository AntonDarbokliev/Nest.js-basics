import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, now, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'User' })
export class User {
  @Prop({ required: true })
  hash: string;

  @Prop({ required: true, type: String, index: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  id: string;

  @Prop({ default: now(), type: Date })
  createdAt: Date;

  @Prop({ default: now(), type: Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' })
  bookmarks: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
