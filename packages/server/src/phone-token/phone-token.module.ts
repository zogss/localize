import { Module } from '@nestjs/common';
import { PhoneTokenService } from './phone-token.service';
import { PhoneTokenController } from './phone-token.controller';

@Module({
  controllers: [PhoneTokenController],
  providers: [PhoneTokenService],
})
export class PhoneTokenModule {}
