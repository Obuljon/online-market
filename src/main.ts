import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedAdmin } from './database/seeds/admin.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const logger: Logger = new Logger('listener');
  const SESSION_SECRET = process.env.SESSION_SECRET || '';

  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await seedAdmin(dataSource);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 kun
        secure: false, // true faqat HTTPS da ishlaydi
        httpOnly: true,
      },
    }),
  );

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Online Market API')
    .setDescription('Online Market backend API documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token'
    }) // Swagger uchun token button
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    logger.log(`server is running:http://localhost:${PORT}`);
  });
}

bootstrap();
