import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'node:path';

import { AccessRequestsModule, AuthGuard, AuthModule, UsersModule } from '@/modules';

import { FilesModule } from './modules/files/files.module';

@Module({
   imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
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
