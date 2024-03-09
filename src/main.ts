import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // TODO: add default port to constants
  const port = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port).then(() => {
    // TODO: add message to constants
    console.log(`App listening on port: ${port}`);
  });
}
bootstrap();
