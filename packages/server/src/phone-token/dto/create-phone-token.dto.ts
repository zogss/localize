import { IsString } from 'class-validator';
import { IsPhoneNumber, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePhoneTokenDto {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^[0-9]+$/, { message: 'Invalid phone, only numbers are allowed' })
  @IsPhoneNumber('BR')
  phone: string;
}
