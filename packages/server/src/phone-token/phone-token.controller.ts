import { Controller, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreatePhoneTokenDto } from './dto/create-phone-token.dto';
import { VerifyPhoneTokenDto } from './dto/verify-phone-token.dto';
import { PhoneTokenService } from './phone-token.service';

@Controller('phone-tokens')
export class PhoneTokenController {
  constructor(private readonly phoneTokenService: PhoneTokenService) {}

  @Post()
  async create(@Body() createPhoneTokenDto: CreatePhoneTokenDto) {
    return await this.phoneTokenService.create(createPhoneTokenDto);
  }

  @Put()
  async find(@Body() VerifyPhoneTokenDto: VerifyPhoneTokenDto) {
    return await this.phoneTokenService.verify(VerifyPhoneTokenDto);
  }
}
