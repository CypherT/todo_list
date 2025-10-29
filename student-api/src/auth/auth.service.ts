import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

// Export interface để controller dùng được
export interface UserResponse {
  id: number;
  full_name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    full_name: string,
  ): Promise<UserResponse> {
    const hash = await bcrypt.hash(password, 10);
    const userData = {
      // Dùng var riêng để tránh conflict với destructuring sau
      email,
      password: hash,
      full_name,
    };
    const user = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(user);
    // Destructuring ở đây, không conflict vì 'password' là property của savedUser
    const { password: _, ...result } = savedUser; // Đổi tên alias thành '_' để rõ ràng, tránh duplicate sense
    return result as UserResponse;
  }

  async validate(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user; // Tương tự, alias để clean
      return result as UserResponse;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  sign(user: UserResponse): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
