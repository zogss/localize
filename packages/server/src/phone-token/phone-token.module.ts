import { Module } from '@nestjs/common';
import { PhoneTokenService } from './phone-token.service';
import { PhoneTokenController } from './phone-token.controller';
import { PlugChatModule } from 'src/plug-chat/plug-chat.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [PlugChatModule, MessagingModule],
  controllers: [PhoneTokenController],
  providers: [PhoneTokenService],
  exports: [PhoneTokenService],
})
export class PhoneTokenModule {}
