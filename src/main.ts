import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configs = new DocumentBuilder()
    .setTitle('backend')
    .setDescription('The API document')
    .setVersion('1.0')
    .addTag('backend')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT || 4001);
}
bootstrap();
