import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlugChatModule } from './plug-chat/plug-chat.module';
import { UsersModule } from './users/users.module';
import { PhoneTokenModule } from './phone-token/phone-token.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      isGlobal: true,
    }),
    PlugChatModule.forRoot({
      authToken: process.env.PLUG_CHAT_AUTH_TOKEN,
    }),
    UsersModule,
    PhoneTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
