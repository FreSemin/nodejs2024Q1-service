import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

// TODO: refactor
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // TODO: add default port to constants
  const port = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe());

  const swaggerDoc = yaml.load(
    readFileSync('doc/api.yaml', { encoding: 'utf-8' }),
  );

  const document = SwaggerModule.createDocument(app, swaggerDoc);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port).then(() => {
    // TODO: add message to constants
    console.log(`App listening on port: ${port}`);
  });
}
bootstrap();
