import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { ForumPostModule } from './forum-post/forum-post.module';
import { CommentModule } from './forum-comments/comment.module';
import { AddFriendsModule } from './add-friends/add-friends.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['./src/data/entities/*.ts'],
      }),
    }),
    ForumPostModule,
    CommentModule,
    AddFriendsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
