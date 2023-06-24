import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { LoginUserInput } from './dto/login-user.inputs';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return false;
    }
    const isVerify = await argon2.verify(user.password, password);

    return isVerify ? user : false;
  }
  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.email);
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user: user,
    };
  }
}
