import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], // 👈 bu shart
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                url: config.get('DATABASE_URL'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: config.get('NODE_ENV') !== 'production',
                ssl: { rejectUnauthorized: false },
            }),
        }),
    ],
})
export class DatabaseModule { }
