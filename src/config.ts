import * as env from "env-var";

export const config = {
  APP_PORT: env.get("APP_PORT").required().asInt(),
  LOG_LEVEL: env
    .get("LOG_LEVEL")
    .required()
    .asEnum(["debug", "info", "warning", "error", "fatal", "trace"]),

  BOT_TOKEN: env.get("BOT_TOKEN").required().asString(),

  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
  POSTGRES_PORT: env.get("POSTGRES_PORT").required().asInt(),
  POSTGRES_HOST: env.get("POSTGRES_HOST").required().asString(),

  SESSION_LIFETIME: env.get("SESSION_LIFETIME").required().asInt(),
} as const;

export const DATABASE_URL = `postgresql://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}:${config.POSTGRES_PORT}/${config.POSTGRES_DB}`;
