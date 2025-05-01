import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    private jwtSecret: string | undefined;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtSecret = configService.get<string>('JWT_SECRET');
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync<{ sub: string; username: string }>(
                token,
                {
                    secret: this.jwtSecret,
                }
            );

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authorization = (request.headers as unknown as Record<string, string | undefined>)
            .authorization;
        if (typeof authorization !== 'string') {
            return undefined;
        }
        const [type, token] = authorization.split(' ');
        return type === 'Bearer' && token ? token : undefined;
    }
}
