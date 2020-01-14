import bcryptjs from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserInputError } from 'apollo-server-core';

import { CrudService } from '../../base/crud.service';
import { UserEntity } from '../user/user.entity';
import { AuthRegisterInput } from './inputs/register.input';
import { AuthLoginInput } from './inputs/login.input';
import { ExpressContext } from '../../types';

@Injectable()
export class AuthService extends CrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) protected readonly repository: Repository<UserEntity>) {
    super();
  }

  async validateUserSession(req: Request): Promise<Partial<UserEntity> | null> {
    // Graphql Playground IntrospectionQuery DOT NOT Validate
    if (req.body.query.includes('IntrospectionQuery')) {
      return null;
    }

    if (!req.session.userId) {
      return null;
    }

    try {
      const { password, ...user } = await this.findOneById(req.session.userId);
      return user;
    } catch (error) {
      return null;
    }
  }

  public async register(input: AuthRegisterInput, req: Request): Promise<UserEntity> {
    const register = new UserEntity();
    Object.assign(register, input);
    const user = await this.create(register);

    req.session.userId = user.id;

    return user;
  }

  public async login(input: AuthLoginInput, req: Request): Promise<UserEntity> {
    const user = await this.findOne({ where: { email: input.email } });

    if (!user || !bcryptjs.compareSync(input.password, user.password)) {
      throw new UserInputError('Invalid email or password');
    }

    req.session.userId = user.id;

    return user;
  }

  public async logout(ctx: ExpressContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!ctx.req.session) {
        return reject(new Error('Express session not found'));
      }

      return ctx.req.session.destroy((err: any) => {
        if (err) {
          return reject(err);
        }

        ctx.res.clearCookie('qid');
        return resolve(true);
      });
    });
  }
}
