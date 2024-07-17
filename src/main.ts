import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000);

  setTimeout(() => {
    console.log('-------------------------------');
    console.log('FAKE DATABASE TABLE DISPONÍVEL NO http://localhost:3000/api');
    console.log('-------------------------------');
  }, 1000);
}
bootstrap();
