import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Student],
      synchronize: false, // DEV: tự tạo bảng. Prod nên dùng migration
    }),
    StudentsModule,
  ],
})
export class AppModule {}