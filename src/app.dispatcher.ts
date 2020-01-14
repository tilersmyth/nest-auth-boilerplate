import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { ConfigService } from './core/config/config.service';
import { EXPRESS_SESSION } from './core/session/session.constants';

export class AppDispatcher {
  private app: INestApplication;
  private config: ConfigService;
  private logger = new Logger(AppDispatcher.name);

  async dispatch(): Promise<void> {
    await this.createServer();
    return this.startServer();
  }

  async shutdown(): Promise<void> {
    await this.app.close();
  }

  private async createServer(): Promise<void> {
    this.app = await NestFactory.create(AppModule);

    const session = this.app.get(EXPRESS_SESSION);
    this.config = this.app.get(ConfigService);

    this.app.enableCors({
      origin: true,
      credentials: true,
    });

    this.app.use(session);

    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
  }

  private async startServer(): Promise<void> {
    await this.app.listen(this.config.PORT, this.config.BASE_HOST);
    this.logger.log(`Server is listening http://${this.config.BASE_HOST}:${this.config.PORT}`);
  }
}
