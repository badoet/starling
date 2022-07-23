import * as path from 'path'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'
import _ from 'lodash'

import { ConfigModule } from '~/src/services/config/config.module'
import { ConfigService } from '~/src/services/config/config.service'

import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.register(path.resolve(process.cwd(), '.env')),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get('LOG_LEVEL').toLowerCase(),
          customSuccessMessage: (req, res) => {
            const items: string[] = _.compact([
              req.method,
              String(res.statusCode),
              req.url,
              String(res.getHeader('content-length')),
              req.socket.remoteAddress,
            ])
            return items.join(' ')
          },
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: true,
              hideObject: true,
            },
          },
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getPostgresConfig(),
    }),
    UserModule,
  ],
})
export class AppModule {}
