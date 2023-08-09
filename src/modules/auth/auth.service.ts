import { Injectable, ForbiddenException } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDto: AuthDTO) {
    const hashedPassword = await argon.hash(authDto.password);
    const user = await this.prismaService.user.create({
      data: {
        email: authDto.email,
        hashedPassword,
        firstName: '',
        lastName: '',
      },
    });

    return user;
  }

  async login(authDto: AuthDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: authDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Wrong email or password');
    }
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDto.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Wrong email or password');
    }
    delete user.hashedPassword;
    return this.signJwtString(user.id, user.email);
  }

  async signJwtString(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10h',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken,
    };
  }
}
