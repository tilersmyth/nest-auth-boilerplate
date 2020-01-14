import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Request } from 'express';

import { ConfigService } from '../config/config.service';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService, private readonly authService: AuthService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      introspection: true,
      installSubscriptionHandlers: true,
      playground: this.config.isDev,
      tracing: this.config.isDev,
      debug: this.config.isDev,
      autoSchemaFile: 'schema.gql',
      definitions: {
        outputAs: 'class',
      },
      context: async (ctx: { req: Request }) => ({
        ...ctx,
        user: await this.authService.validateUserSession(ctx.req),
      }),
      formatError: (error: any) => {
        if (error.message && error.message.error) {
          return new Error(error.message.error);
        }

        return error;
      },
    };
  }
}
