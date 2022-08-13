import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async findOne(@Param('id') id: number) {
    const res = await this.userService.findOne('id', id);
    delete res.data.password;
    if (!res.data) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update('id', id, updateUserDto);
  }
}
