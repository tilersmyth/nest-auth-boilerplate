import { Resolver, Query } from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Me } from './user.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto, { nullable: true })
  async me(@Me() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Query(() => [UserDto])
  async allUsers(): Promise<UserEntity[]> {
    return this.userService.find();
  }
}
