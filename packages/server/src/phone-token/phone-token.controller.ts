import { Controller, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { PlugChatProvider } from 'src/plug-chat/plug-chat.provider';
import { CreatePhoneTokenDto } from './dto/create-phone-token.dto';
import { VerifyPhoneTokenDto } from './dto/verify-phone-token.dto';
import { PhoneTokenService } from './phone-token.service';

@Controller('phone-tokens')
export class PhoneTokenController {
  constructor(
    private readonly phoneTokenService: PhoneTokenService,
    private plugChatProvider: PlugChatProvider,
  ) {}

  @Post()
  async create(@Body() createPhoneTokenDto: CreatePhoneTokenDto) {
    const phoneToken = await this.phoneTokenService.create(createPhoneTokenDto);
    const message = `Your verification code is ${phoneToken.code}`;
    // await this.plugChatProvider.sendText(message, createPhoneTokenDto.phone);
    return true;
  }

  @Put()
  async find(@Body() VerifyPhoneTokenDto: VerifyPhoneTokenDto) {
    return await this.phoneTokenService.verify(VerifyPhoneTokenDto);
  }
}
