import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const logger: Logger = new Logger('listener');
  const SESSION_SECRET = process.env.SESSION_SECRET || '';

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
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

  await app.listen(PORT, () => {
    logger.log(`http://localhost:${PORT}`);
  });
}

bootstrap();
