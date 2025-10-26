import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

function getExpiresInSeconds(): number {
  const raw = process.env.JWT_EXPIRES ?? '3600';
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 3600; 
}

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'dev_secret',
      signOptions: { expiresIn: 36000 },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}