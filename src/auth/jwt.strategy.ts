import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'my-32-character-ultra-secure-and-ultra-long-secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const atIndex = email.indexOf('@');
    const role = email.substring(0, atIndex);
    return { userId: payload.sub, email, role };
  }
}
