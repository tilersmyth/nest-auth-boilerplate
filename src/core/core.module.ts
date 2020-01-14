import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { TypeormService } from './typeorm/typeorm.service';
import { GraphqlService } from './graphql/graphql.service';
import { ConfigModule } from './config/config.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      useClass: GraphqlService,
    }),
    ConfigModule,
    SessionModule,
  ],
})
export class CoreModule {}
