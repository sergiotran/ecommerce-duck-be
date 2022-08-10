import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(null, 'email', email);

    if (user) {
      const { password: userPassword, ...userObj } = user;
      const isMatchUserPassword = await compare(password, userPassword);
      if (!isMatchUserPassword) {
        throw new UnauthorizedException();
      }
      return userObj;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
