import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtServce: JwtService,
  ) {}

  async signin(dto: AuthDto) {
    try {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (!existingUser) {
        throw new ForbiddenException("User doesn't exist");
      }

      const isPasswordCorrect = bcrypt.compare(dto.password, existingUser.hash);

      if (!isPasswordCorrect) {
        throw new ForbiddenException('Wrong password');
      }
      const payload = {
        sub: existingUser.id,
        email: existingUser.email,
      };
      return {
        access_token: await this.jwtServce.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: AuthDto) {
    try {
      const hash = await bcrypt.hash(dto.password, 10);
      const user = await this.userModel.create({
        email: dto.email,
        hash,
      });

      const payload = {
        sub: user.id,
        email: user.email,
      };
      return {
        access_token: await this.jwtServce.signAsync(payload),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('Credentials taken');
      } else {
        throw error;
      }
    }
  }
}
