import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, now, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Bookmark>;

@Schema()
export class Bookmark {
  @Prop({ required: true })
  id: string;

  @Prop({
    default: now(),
    type: Date,
  })
  createdAt: Date;

  @Prop({
    default: now(),
    type: Date,
  })
  updatedAt: Date;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  link: string;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
