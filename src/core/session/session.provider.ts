import { Logger } from '@nestjs/common';
import expressSession from 'express-session';
import Redis from 'ioredis';
import Store from 'connect-redis';

import { EXPRESS_SESSION, EXPRESS_SESSION_FACTORY, EXPRESS_SESSION_NAME } from './session.constants';
import { SessionService } from './session.service';

export const sessionProvider = {
  provide: EXPRESS_SESSION,
  useFactory: async (sessionService: SessionService) => {
    const logger = new Logger(EXPRESS_SESSION_NAME);
    try {
      const redis = new Redis();
      const RedisStore = Store(expressSession);
      const store = new RedisStore({
        client: redis as any,
      });

      logger.log('Initiating Session...');

      const options = sessionService.options(store);

      return expressSession(options);
    } catch (err) {
      logger.error('Initiating Express Session failed');
      throw err;
    }
  },
  inject: [SessionService],
};
