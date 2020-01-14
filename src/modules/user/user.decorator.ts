import { createParamDecorator } from '@nestjs/common';

import { UserEntity } from './user.entity';

export const Me = createParamDecorator((data, [root, args, ctx, info]): UserEntity | undefined => {
  return ctx.user;
});
