import { User } from 'src/users/entities/user.entity';

export class AuthOutputDto {
  user: User;
  token: string;
}
