import { IsString } from 'class-validator';
import { IsPhoneNumber, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @Matches(/^[a-zA-Z0-9_.]+$/, { message: 'Invalid username' })
  username: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^[0-9]+$/, { message: 'Invalid phone, only numbers are allowed' })
  @IsPhoneNumber('BR')
  phone: string;
}
