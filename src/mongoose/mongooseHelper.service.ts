import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark } from '../bookmark/bookmark.schema';
import { User } from '../user/user.schema';

@Injectable()
export class MongooseHelperService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Bookmark.name) private bookmarkModel: Model<Bookmark>,
  ) {}

  async dropDB() {
    await this.userModel.deleteMany();
    await this.bookmarkModel.deleteMany();
    console.log('Database dropped');
  }
}
