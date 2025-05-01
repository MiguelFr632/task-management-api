import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = Number(
            configService.get<string>('JWT_EXPIRATION_TIME') || '3600'
        );
    }

    signIn(username: string, password: string): AuthResponseDto {
        const findUser = this.usersService.findByUserName(username);

        if (!findUser || !bcryptCompareSync(password, findUser.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: findUser.id, username: findUser.username };

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTimeInSeconds };
    }
}
