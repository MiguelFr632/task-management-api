import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: Number(configService.get<number>('DB_PORT')),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [__dirname + '/entities/**'],
                migrations: [__dirname + '/migrations/*.ts'],
                synchronize: false, // synchronize SEMPRE deve estar como false em produção, se não as migrations podem bugar
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DbModule {}
