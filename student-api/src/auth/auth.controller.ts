import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService, UserResponse } from './auth.service'; // Import UserResponse từ service
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe()) // Validate DTO
  async register(@Body() dto: RegisterDto): Promise<UserResponse> {
    // Return type rõ
    return this.auth.register(
      dto.email.trim(),
      dto.password,
      dto.full_name?.trim(),
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: LoginDto,
  ): Promise<{ access_token: string; user: UserResponse }> {
    const user = await this.auth.validate(dto.email.trim(), dto.password);
    const access_token = this.auth.sign(user);
    return { access_token, user };
  }
}
