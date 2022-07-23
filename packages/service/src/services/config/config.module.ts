import { DynamicModule, Global, Module } from '@nestjs/common'

import { ENV_FILE } from './config.constant'
import { ConfigService } from './config.service'

@Global()
@Module({})
export class ConfigModule {
  public static register(envFile: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ENV_FILE,
          useValue: envFile,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    }
  }
}
