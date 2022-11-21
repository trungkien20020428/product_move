import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import User from 'src/users/entities/user.entity';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @Inject('USERS_REPOSITORY')
    private UsersRepository: typeof User,
  ) {}

  async validate(Login) {
    const { email, password } = Login;
    // find the user by email
    const user = await this.UsersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await bcrypt.compare(password, user.hash);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    delete user.hash;
    const accessToken = await this.signToken(user.id, user.email);
    return {
      code: 200,
      messeage: 'login success',
      success: true,
      result: { accessToken: accessToken, user },
    };
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return token;
  }
}
