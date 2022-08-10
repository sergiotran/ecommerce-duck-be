import { AuthController } from './auth.controller';
import { AuthStrategy } from './strategies/auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'DUC_DEP_TRAI',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
