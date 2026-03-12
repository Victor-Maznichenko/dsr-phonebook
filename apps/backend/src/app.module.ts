import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'node:path';

import { AccessRequestsModule, AuthGuard, AuthModule, UsersModule } from '@/modules';

import { FilesModule } from './modules/files/files.module';

@Module({
   imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
    }),
 SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = process.env.NODE_ENV === 'production';

        if (isProd) {
          return {
            dialect: 'postgres',
            uri: config.get<string>('DATABASE_URL'),
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
            models: [],
            autoLoadModels: true,
          } as SequelizeModuleOptions;
        }

        return {
          dialect: 'postgres',
          host: config.get<string>('POSTGRES_HOST'),
          port: Number(config.get<number>('POSTGRES_PORT') || 5432),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          models: [],
          autoLoadModels: true,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'modules/static'),
    }),
    AuthModule,
    UsersModule,
    AccessRequestsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
