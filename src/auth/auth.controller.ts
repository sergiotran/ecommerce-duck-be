import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('verify')
  async verifyToken(@Body('token') token: string) {
    return await this.authService.verifyToken(token);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res, @Body() user: CreateUserDto) {
    const serviceResponse = await this.userService.create(user);
    if (serviceResponse.statusCode === HttpStatus.BAD_REQUEST) {
      res.status(serviceResponse.statusCode).json(serviceResponse);
    }
    res.status(serviceResponse.statusCode).json(serviceResponse);
  }
}
