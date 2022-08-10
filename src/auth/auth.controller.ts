import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthStrategy)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
