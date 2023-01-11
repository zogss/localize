import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDto } from './dto/auth-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() authInputDto: AuthInputDto) {
    const res = await this.authService.validateUser(authInputDto);
    return res;
  }
}
