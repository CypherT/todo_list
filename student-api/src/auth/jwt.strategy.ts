import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dev_secret',
    });
  }
  async validate(payload: any) {
    // Trả về sẽ gắn vào req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}