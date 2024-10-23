/**********************************
 * @Description: 公共模块
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:29:25
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Global, Module, ValidationPipe } from '@nestjs/common';
import { SharedService } from './shared.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          host: process.env.DB_HOST || configService.get('DB_HOST'),
          port: +process.env.DB_PORT || configService.get('DB_PORT'),
          username: process.env.DB_USER || configService.get('DB_USER'),
          password: process.env.DB_PWD || configService.get('DB_PWD'),
          database: process.env.DB_DATABASE || configService.get('DB_DATABASE'),
          synchronize: process.env.NODE_ENV === 'production' ? false : configService.get('DB_SYNC'),
          timezone: '+08:00',
        };
      },
    }),
  ],
  providers: [
    SharedService,
    RedisService,
    {
      inject: [ConfigService],
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          url: configService.get('REDIS_URL'),
        });
        await client.connect();
        return client;
      },
    },
    {
      // 全局错误过滤器
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      //全局参数校验管道
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true, // 自动类型转换
      }),
    },
  ],
  exports: [SharedService, RedisService],
})
export class SharedModule {}
