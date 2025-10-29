// src/app.module.ts (thêm vào imports)
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Để đọc .env.dev
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config'; // Import file mới
import { AuthModule } from './auth/auth.module'; // Nếu có
import { TodosModule } from './todos/todos.module'; // Nếu có

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev', // Đọc từ .env.dev
      isGlobal: true, // Dùng toàn cục
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService, // Dùng service config
    }),
    AuthModule, // Import modules khác
    TodosModule,
  ],
})
export class AppModule {}
