import { User } from './../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    @InjectRepository(Product)
    private readonly productModel: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { userId: id, ...productCreateDto } = createProductDto;
      const user = await this.userModel.findOne({
        where: {
          id,
        },
      });
      const product = new Product();

      for (const item in productCreateDto) {
        product[item] = productCreateDto[item];
      }

      product.user = user;

      await this.productModel.save(product);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product created successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const products = await this.productModel
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .getMany();

      return products;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productModel
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .where('product.id = :id', {
          id,
        })
        .getOne();

      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
