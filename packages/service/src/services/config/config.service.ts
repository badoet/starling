import * as fs from 'fs'

import * as dotenv from 'dotenv'
import { validateSync } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Injectable, Inject, Logger } from '@nestjs/common'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import _ from 'lodash'

import { ENV_FILE } from './config.constant'
import { ConfigDto } from './config.dto'
import { LogLevel } from './config.enum'

@Injectable()
export class ConfigService {
  private readonly config: ConfigDto
  private readonly logger = new Logger(ConfigService.name)

  constructor(@Inject(ENV_FILE) private envFile: string) {
    const config = plainToClass(ConfigDto, {
      ...this.getDotenvConfig(envFile),
      ...process.env,
    })

    const validationResult = validateSync(config, {
      whitelist: true,
      forbidUnknownValues: true,
    })

    if (validationResult && validationResult.length > 0) {
      throw new Error(`config invalid\n${validationResult}`)
    }

    this.config = config
  }

  public get<K extends keyof ConfigDto>(
    key: K,
    value?: ConfigDto[K],
  ): ConfigDto[K] {
    if ((this.config[key] === undefined || this.config[key] == null) && value) {
      return value
    }
    return this.config[key]
  }

  public getPostgresConfig(): TypeOrmModuleOptions {
    const postgresConfig: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: this.get('POSTGRES_PORT'),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: _.compact([
        this.isLogLevel(LogLevel.Error) && 'error',
        this.isLogLevel(LogLevel.Warn) && 'warn',
        this.isLogLevel(LogLevel.Info) && 'info',
        this.isLogLevel(LogLevel.Info) && 'log',
        this.isLogLevel(LogLevel.Info) && 'migration',
        this.isLogLevel(LogLevel.Debug) && 'query',
        this.isLogLevel(LogLevel.Trace) && 'schema',
      ]),
      // TODO: Disable synchronize for migrations in TST and PROD
      synchronize: true,
      dropSchema: false,
    }
    return postgresConfig
  }

  private getDotenvConfig(envFile: string): Record<string, unknown> {
    if (fs.existsSync(envFile)) {
      return dotenv.parse(fs.readFileSync(envFile))
    }
    return {}
  }

  private isLogLevel(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      [LogLevel.Fatal]: 0,
      [LogLevel.Error]: 1,
      [LogLevel.Warn]: 2,
      [LogLevel.Info]: 3,
      [LogLevel.Debug]: 4,
      [LogLevel.Trace]: 5,
    }
    return levels[this.get('LOG_LEVEL')] >= levels[level]
  }
}
