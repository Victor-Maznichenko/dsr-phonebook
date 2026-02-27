import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import process from 'node:process';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookies
  app.use(cookieParser());

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('DSR Phonebook')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .addSecurityRequirements('access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Убираем security у роутов, помеченных Public()
  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (Array.isArray(method.security) && method.security.includes('public')) {
        method.security = [];
      }
    });
  });

  SwaggerModule.setup('/api/docs', app, document);

  // App start
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
