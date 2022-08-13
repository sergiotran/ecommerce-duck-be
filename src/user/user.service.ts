import { UpdateUserDto } from './dto/update-user.dto';
import { userPasswordSaltRound } from './../common/constants/user.constant';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

export type UserQuery = keyof User;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly model: Repository<User>,
  ) {}

  async isDuplicateEntry(field: keyof User, value: string | number) {
    return !!(await this.findOne(field, value));
  }

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

      const duplicateFields = [];
      const [existedEmail, existedPhone] = [
        await this.isDuplicateEntry('email', newUserDto.email),
        await this.isDuplicateEntry('phone_number', newUserDto.phone_number),
      ];
      if (existedEmail) {
        duplicateFields.push(`Email is already in used`);
      }
      if (existedPhone) {
        duplicateFields.push(`Phone number is already in used`);
      }

      if (duplicateFields.length) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: duplicateFields,
        };
      }

      await this.model.save(newUser);

      return {
        statusCode: HttpStatus.CREATED,
        message: `User created successfully`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const users = await this.model
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.products', 'product')
        .getMany();

      return {
        statusCode: HttpStatus.OK,
        data: users,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(field: UserQuery, value: string | number | boolean) {
    const user = await this.model
      .createQueryBuilder('user')
      .where(`${field} = :${field}`, {
        [String(field)]: value,
      })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      return {
        statusCode: HttpStatus.OK,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  async update(
    identifyField: UserQuery,
    value: string | number | boolean,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      const duplicateFields = [];
      const [existedEmail, existedPhone] = [
        await this.isDuplicateEntry('email', updateUserDto.email),
        await this.isDuplicateEntry('phone_number', updateUserDto.phone_number),
      ];
      if (existedEmail) {
        duplicateFields.push(`Email is already in used`);
      }
      if (existedPhone) {
        duplicateFields.push(`Phone number is already in used`);
      }

      if (duplicateFields.length) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: duplicateFields,
        };
      }

      await this.model
        .createQueryBuilder('user')
        .where(`${identifyField} = :${identifyField}`, {
          [String(identifyField)]: value,
        })
        .update()
        .set(updateUserDto)
        .execute();

      return {
        statusCode: HttpStatus.OK,
        message: `User updated successfully`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
