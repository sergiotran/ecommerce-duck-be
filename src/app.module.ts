import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [UserModule, CategoryModule, ProductModule, CartModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
