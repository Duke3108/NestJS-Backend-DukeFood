import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sequelizeConfig } from 'src/config/sequelize.config';


@Module({


  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => sequelizeConfig(configService)
    }),
  ],
})
export class AppModule {}
