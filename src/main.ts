import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const SwaggerCustomOptions = {
    explorer: true,
    customCssUrl: '/styles/swagger.css',
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
      persistAuthorization: true,
      requestInterceptor: function (request) {
        console.log('[Swagger] intercept try-it-out request');

        const authToken: string | undefined = JSON.parse(
          localStorage.getItem('authorized') || '{}',
        ).oauth2?.token?.access_token;

        if (authToken) request.headers.Authorization = 'Bearer ' + authToken;
        return request;
      },
    },
  };

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger API Example')
    .setDescription('Provides an example API with Authentication, Users, File Upload')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, SwaggerCustomOptions);

  await app.listen(3000);
}
bootstrap();
