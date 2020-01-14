import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { AuthRegisterInput } from './inputs/register.input';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { ExpressContext } from '../../types';
import { AuthLoginInput } from './inputs/login.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserDto)
  async register(@Args('input') input: AuthRegisterInput, @Context() ctx: ExpressContext) {
    return this.authService.register(input, ctx.req);
  }

  @Mutation(() => UserDto)
  async login(@Args('input') input: AuthLoginInput, @Context() ctx: ExpressContext) {
    return this.authService.login(input, ctx.req);
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: ExpressContext) {
    return this.authService.logout(ctx);
  }
}
