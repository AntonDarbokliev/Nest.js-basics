import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async editUser(id: number, dto: EditUserDto) {
    await this.userModel.updateOne({ id: id }, dto);
    const user = this.userModel.findOne({ id: id });
    return user;
  }
}
