import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard/JwtGuard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator/GetUser';
import { CreateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  async getBookmarks(@GetUser('_id') userId: number) {
    const bookmarks = await this.bookmarkService.getBookmarks(userId);
    return bookmarks;
  }

  @Get(':id')
  async getSingleBookmark(
    @GetUser('_id') userId: number,
    @Param('id') bookmarkId: string,
  ) {
    const userIdToPass = userId.valueOf();

    const bookmark = await this.bookmarkService.getSingleBookmark(
      userIdToPass,
      bookmarkId,
    );
    return bookmark;
  }

  @Post()
  async createBookmark(
    @GetUser('_id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    const newBookmark = await this.bookmarkService.createBookmark(userId, dto);
    return newBookmark;
  }

  @Patch(':id')
  async editBookmark(
    @GetUser('_id') userId: number,
    @Body() dto: CreateBookmarkDto,
    @Param('id') bookmarkId: string,
  ) {
    const userIdToPass = userId.valueOf();
    const editedBookmark = await this.bookmarkService.editBookmark(
      userIdToPass,
      bookmarkId,
      dto,
    );

    console.log('Edited bookmark in controller: ', editedBookmark);

    return editedBookmark;
  }

  @Delete(':id')
  async deleteBookmark(
    @Param('id') bookmarkId: string,
    @GetUser('id') userId: number,
  ) {
    await this.bookmarkService.deleteBookmark(userId, bookmarkId);
  }
}
