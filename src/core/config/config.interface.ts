import { CleanEnv } from 'envalid';

export interface IDotEnv extends CleanEnv {
  PROTOCOL: string;
  PORT: number;
  BASE_HOST: string;
  PUBLIC_DIR: string;
  // DB
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_SYNCHRONIZE: string;
  // SESSION
  SESSION_NAME: string;
  SESSION_SECRET: string;
  SESSION_COOKIE_MAX_AGE: number;
}
