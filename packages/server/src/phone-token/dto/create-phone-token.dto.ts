import { IsString } from 'class-validator';
import {
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreatePhoneTokenDto {
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  @MinLength(11, { message: 'Phone must be at least 11 characters' })
  @MaxLength(11, { message: 'Phone must be at most 11 characters' })
  @Matches(/^[0-9]+$/, { message: 'Invalid phone, only numbers are allowed' })
  @IsPhoneNumber('BR')
  phone: string;
}
