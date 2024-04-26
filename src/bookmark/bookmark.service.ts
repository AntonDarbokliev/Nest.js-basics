import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bookmark } from './bookmark.schema';
import { Model } from 'mongoose';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/editBookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<Bookmark>,
  ) {}

  async getBookmarks(userId: number) {
    const bookmarks = await this.bookmarkModel.find({ userId: userId });
    return bookmarks;
  }

  async getSingleBookmark(userId: number, bookmarkId: string) {
    const bookmark = await this.bookmarkModel.findOne({
      userId: userId,
      _id: bookmarkId,
    });
    console.log('Bookmark: ', bookmark);

    return bookmark;
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const user = await this.bookmarkModel.create({ ...dto, userId });
    return user;
  }

  async editBookmark(userId: number, bookmarkId: string, dto: EditBookmarkDto) {
    console.log('userId in service: ', userId);
    console.log('bookmarkId in service: ', bookmarkId);

    const bookmark = await this.bookmarkModel.findOneAndUpdate(
      { _id: bookmarkId, userId: userId },
      dto,
      { new: true },
    );

    return bookmark;
  }

  async deleteBookmark(userId: number, bookmarkId: string) {
    const editedBookmark = await this.bookmarkModel.deleteOne({
      userId: userId,
      id: bookmarkId,
    });
    return editedBookmark;
  }
}
