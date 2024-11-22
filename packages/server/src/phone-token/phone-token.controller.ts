import { Controller, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreatePhoneTokenDto } from './dto/create-phone-token.dto';
import { VerifyPhoneTokenDto } from './dto/verify-phone-token.dto';
import { PhoneTokenService } from './phone-token.service';
import { MessagingService } from 'src/messaging/messaging.service';

@Controller('phone-tokens')
export class PhoneTokenController {
  constructor(
    private readonly phoneTokenService: PhoneTokenService,
    private readonly messagingService: MessagingService,
  ) {}

  @Post()
  async create(@Body() createPhoneTokenDto: CreatePhoneTokenDto) {
    const phoneToken = await this.phoneTokenService.create(createPhoneTokenDto);
    const message = `Your verification code is ${phoneToken.code}`;
    await this.messagingService.sendWhatsappCode(
      message,
      createPhoneTokenDto.phone,
    );
    return true;
  }

  @Put()
  async find(@Body() verifyPhoneTokenDto: VerifyPhoneTokenDto) {
    return await this.phoneTokenService.verify(verifyPhoneTokenDto);
  }
}
