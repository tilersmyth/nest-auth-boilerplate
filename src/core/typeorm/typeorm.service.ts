import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.DB_HOST,
      port: this.configService.DB_PORT,
      username: this.configService.DB_USER,
      password: this.configService.DB_PASSWORD,
      database: this.configService.DB_DATABASE,
      logging: !this.configService.isProduction,
      synchronize: this.configService.DB_SYNCHRONIZE,
      entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
      dropSchema: false,
    };
  }
}
