import { Module } from '@nestjs/common';
import { MongooseHelperService } from './mongooseHelper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { BookmarkSchema } from '../bookmark/bookmark.schema';

@Module({
  providers: [MongooseHelperService],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Bookmark', schema: BookmarkSchema }]),
  ],
})
export class MongooseHelperModule {}
