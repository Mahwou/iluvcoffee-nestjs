import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties that do not have any decorators
    transform: true, // Automatically transform payloads to be objects typed according to their defined types
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
  }));
  await app.listen(3000);
}
bootstrap();
