import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';
=======
>>>>>>> eb58b832d3fc5c1d01a380dd3875c0aa0ad01e0b

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
<<<<<<< HEAD
      entities: [Student,User],
      synchronize: false, // DEV: tự tạo bảng. Prod nên dùng migration
    }),
    StudentsModule,
    AuthModule,
    UsersModule,
=======
      entities: [Student],
      synchronize: false, // DEV: tự tạo bảng. Prod nên dùng migration
    }),
    StudentsModule,
>>>>>>> eb58b832d3fc5c1d01a380dd3875c0aa0ad01e0b
  ],
})
export class AppModule {}