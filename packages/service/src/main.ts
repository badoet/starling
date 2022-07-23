import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'

import { name, version } from '~/package.json'

import { AppModule } from './app/app.module'
import { ConfigService } from './services/config/config.service'
import { Environment } from './services/config/config.enum'

const setupApp = (
  app: NestExpressApplication,
  configService: ConfigService,
) => {
  app.useLogger(app.get(Logger))

  if (configService.get('CORS')) {
    app.enableCors({
      origin: '*',
      optionsSuccessStatus: 200,
    })
  }

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages:
        configService.get('ENVIRONMENT') === Environment.Production,
      whitelist: true,
      transform: true,
    }),
  )

  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  app.disable('x-powered-by')
}

const setupSwagger = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle(name)
    .setVersion(version)
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }
  const swaggerDocument = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('/docs', app, swaggerDocument)
}

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  })

  const logger = app.get(Logger)
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  setupApp(app, configService)

  if (configService.get('ENVIRONMENT') === Environment.Local) {
    setupSwagger(app)
  } else {
    app.enableShutdownHooks()
  }

  await app.listen(port)

  logger.log(`Server listening on port ${port}`)
}

bootstrap()
