import { Reflector } from '@nestjs/core';
import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const { data: user } = await this.userService.findOne('email', email);

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

  async verifyToken(token: string) {
    try {
      await this.jwtService.verify(token);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  async login(user: User) {
    return {
      statusCode: HttpStatus.OK,
      access_token: this.jwtService.sign(user),
    };
  }
}
