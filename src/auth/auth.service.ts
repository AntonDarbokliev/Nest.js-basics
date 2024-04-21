import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return {
      message: 'I have signed in',
    };
  }

  signup() {
    return {
      message: 'I have signed up',
    };
  }
}
