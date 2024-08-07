/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';


/**
 * User created Modules
 */

@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
