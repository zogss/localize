import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PhoneTokenService } from 'src/phone-token/phone-token.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthInputDto } from './dto/auth-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private phoneTokenService: PhoneTokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authInputDto: AuthInputDto): Promise<any> {
    await this.phoneTokenService.verify(authInputDto);

    const user = await this.usersService.findByPhone(authInputDto.phone);

    const token = await this.jwtToken(user);
    return { user, token };
  }

  async jwtToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
