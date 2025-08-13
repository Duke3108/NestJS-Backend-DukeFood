import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategies';
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';


@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy, 
    LocalAuthGuard, 
    JwtStrategy, 
    JwtAuthGuard
  ],
  imports: [UserModule],
})
export class AuthModule {}
