import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('First nestJs app')
    .setDescription('Documentation REST API')
    .setVersion('0.0.1')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDoc);

  const configService = app.get(ConfigService);
  const httpPort = configService.get('APP_HTTP_PORT');

  await app.listen(httpPort || 8000, () => {
    console.log(`Server started on port: ${httpPort}`);
  });
}
bootstrap();
