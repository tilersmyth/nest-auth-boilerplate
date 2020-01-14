import { Module } from '@nestjs/common';

import { SessionService } from './session.service';
import { sessionProvider } from './session.provider';
import { ConfigService } from '../config/config.service';

@Module({
  providers: [SessionService, sessionProvider, ConfigService],
  exports: [sessionProvider],
})
export class SessionModule {}
