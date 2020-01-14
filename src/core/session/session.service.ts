import { Injectable } from '@nestjs/common';
import expressSession from 'express-session';
import Store from 'connect-redis';

import { ConfigService } from '../config/config.service';

@Injectable()
export class SessionService {
  constructor(readonly config: ConfigService) {}
  options(store: Store.RedisStore): expressSession.SessionOptions {
    return {
      store,
      name: this.config.SESSION_NAME,
      secret: this.config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: this.config.isProduction,
        maxAge: this.config.SESSION_COOKIE_MAX_AGE,
      },
    };
  }
}
