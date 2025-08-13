import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sequelizeConfig } from 'src/config/sequelize.config';
import { CategoryModule } from './modules/category/category.module';
import { StartTimeMiddleware } from 'src/common/middlewares/startTime.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { SeedModule } from './modules/seed/seed.module';
import { ProductModule } from './modules/product/product.module';


@Module({


  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => sequelizeConfig(configService)
    }),
    CategoryModule,
    AuthModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') 
        },
      }),
      global: true,
    }),
    SeedModule,
    ProductModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StartTimeMiddleware)
      .forRoutes('*');
  }
}
