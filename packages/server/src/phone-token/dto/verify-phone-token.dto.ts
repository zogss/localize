import { IsString } from 'class-validator';
import { IsPhoneNumber, Matches, MaxLength, MinLength } from 'class-validator';

export class VerifyPhoneTokenDto {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^[0-9]+$/, { message: 'Invalid phone, only numbers are allowed' })
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @Matches(/^[0-9]+$/, { message: 'Invalid token, only numbers are allowed' })
  code: string;
}
