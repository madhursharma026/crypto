import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AddCoinModule } from './add-coin/add-coin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddCoin } from './add-coin/entities/add-coin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'cryptocurrency',
        entities:  [AddCoin],
        synchronize: true,
        autoLoadEntities: true,
        };
      },
    }),
    AddCoinModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
