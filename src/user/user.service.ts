import { userPasswordSaltRound } from './../common/constants/user.constant';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'bcrypt';

export type UserQuery = keyof User;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly model: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...newUserDto } = createUserDto;
      const newUser = new User();
      for (const key in newUserDto) {
        newUser[key] = createUserDto[key];
      }
      // Hashing password
      const hashedPassword = await hash(password, userPasswordSaltRound);
      newUser.password = hashedPassword;

      await this.model.save(newUser);

      return {
        statusCode: HttpStatus.CREATED,
        message: `User created successfully`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.model
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.products', 'product')
        .getMany();

      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(
    id?: number,
    customField?: UserQuery,
    value?: string | number | boolean,
  ): Promise<User> {
    try {
      let user;
      if (id && !customField && !value) {
        user = await this.model
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.products', 'product')
          .where('id = :id', {
            id,
          })
          .getOne();
      } else {
        user = await this.model
          .createQueryBuilder('user')
          .where(`${customField} = :${customField}`, {
            [customField]: value,
          })
          .addSelect('user.password')
          .getOne();
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
