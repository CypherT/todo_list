// src/config/typeorm.config.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Todo } from '../todos/todo.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    // Lấy từng var riêng lẻ từ .env.dev (thay vì object 'database')
    const host = this.configService.get<string>('DATABASE_HOST');
    const port = this.configService.get<number>('DATABASE_PORT');
    const username = this.configService.get<string>('DATABASE_USER');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const database = this.configService.get<string>('DATABASE_NAME');

    // Kiểm tra nếu thiếu config (thay vì check object)
    if (!host || !port || !username || !database) {
      throw new Error(
        'Cấu hình cơ sở dữ liệu bị thiếu. Kiểm tra file .env.dev có đầy đủ DATABASE_* vars không:\n' +
          '- DATABASE_HOST\n' +
          '- DATABASE_PORT\n' +
          '- DATABASE_USER\n' +
          '- DATABASE_PASSWORD\n' +
          '- DATABASE_NAME',
      );
    }

    // Log config để debug (xóa sau nếu không cần)
    console.log('🔌 DB Config:', {
      host,
      port,
      database,
      // Không log password
    });

    return {
      type: 'mysql' as const,
      host,
      port,
      username,
      password: password || '', // Nếu pass rỗng (như root XAMPP), dùng ''
      database,
      entities: [User, Todo],
      synchronize: true, // Tạm true để tự tạo table (đổi false ở production)
      logging: true, // Bật log query để debug
    };
  }
}
