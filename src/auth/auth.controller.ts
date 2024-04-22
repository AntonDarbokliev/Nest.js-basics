import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return user;
  }

  @Post('signin')
  async signIn(@Body() dto: AuthDto) {
    return await this.authService.signin(dto);
  }
}
