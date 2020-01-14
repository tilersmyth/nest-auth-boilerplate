import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config.service';

const envFile = process.env.NODE_ENV !== 'production' ? '.env' : '.env.production';
export const envConfig = new ConfigService(envFile);

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(envFile),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
