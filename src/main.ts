import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WalletModule } from './app/wallets/wallets.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setTitle('Assis code challenge Docs')
    .setDescription('Swagger documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [WalletModule],
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);

  setTimeout(() => {
    console.log('-------------------------------');
    console.log('FAKE DATABASE TABLE DISPONÍVEL NO http://localhost:3000/api');
    console.log('-------------------------------');
  }, 1000);
}
bootstrap();
