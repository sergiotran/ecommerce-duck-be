import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      database: process.env.DATABASE_NAME || 'my_blog',
      username: process.env.DATABASE_USERNAME || 'admin',
      password: process.env.DATABASE_PASSWORD || '1561',
      host: process.env.DATABASE_HOST || 'localhost',
      autoLoadEntities: true,
      synchronize: !(process.env.NODE_ENV === 'production'),
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
