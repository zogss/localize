import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
