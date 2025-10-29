// src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Bootstrap function để khởi động ứng dụng NestJS.
 * - Tạo app instance từ AppModule.
 * - Áp dụng global ValidationPipe để validate DTO (class-validator).
 * - Listen trên port 3000 (có thể config từ env).
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global ValidationPipe: Validate input DTO tự động (whitelist: chỉ giữ properties có decorator, forbidNonWhitelisted: báo lỗi nếu thừa).
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ giữ properties có @Is... decorators
      forbidNonWhitelisted: true, // Báo lỗi 400 nếu body có field thừa
      transform: true, // Tự động transform body thành DTO type
    }),
  );

  // Optional: Đọc port từ ConfigService (nếu dùng @nestjs/config)
  // const configService = app.get(ConfigService);
  // const port = configService.get<number>('PORT') || 3000;
  const port = 3000; // Hardcode tạm, hoặc dùng env: process.env.PORT || 3000

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Endpoints:`);
  console.log(`  - Auth: POST /auth/register, POST /auth/login`);
  console.log(`  - Todos: GET/POST/PUT/DELETE /todos`);
}
bootstrap().catch((err) => {
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
