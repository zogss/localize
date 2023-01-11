import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Cache } from 'cache-manager';
import { CreatePhoneTokenDto } from './dto/create-phone-token.dto';
import { VerifyPhoneTokenDto } from './dto/verify-phone-token.dto';
import { PhoneToken } from './interfaces/phone-token.interface';

@Injectable()
export class PhoneTokenService {
  private readonly cacheTime = 1000 * 60 * 15; // 15 minutes
  private readonly codeLength = 6;
  private readonly redisPrefix = 'phone-token';

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(createPhoneTokenDto: CreatePhoneTokenDto): Promise<PhoneToken> {
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(this.codeLength, '0');

    const phoneToken = {
      phone: createPhoneTokenDto.phone,
      code,
    };

    await this.cacheManager.set(
      `${this.redisPrefix}:${createPhoneTokenDto.phone}`,
      phoneToken,
      this.cacheTime,
    );

    return phoneToken;
  }

  async verify(verifyPhoneTokenDto: VerifyPhoneTokenDto): Promise<PhoneToken> {
    const phoneToken = await this.cacheManager.get<PhoneToken>(
      `${this.redisPrefix}:${verifyPhoneTokenDto.phone}`,
    );

    if (!phoneToken) {
      throw new NotFoundException('Phone token not found1');
    }

    if (phoneToken.code !== verifyPhoneTokenDto.code) {
      throw new NotFoundException('Phone token not found2');
    }

    return phoneToken;
  }

  async deleteByPhone(phone: string): Promise<void> {
    await this.cacheManager.del(`${this.redisPrefix}:${phone}`);
  }
}
