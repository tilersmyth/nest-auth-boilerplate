import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
