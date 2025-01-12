import {z} from 'zod';

export const SignUpSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required!',
    })
    .min(3, 'First name must be at least 3 characters long!')
    .max(20, 'First name must be at most 20 characters long!'),
  lastName: z
    .string({
      required_error: 'Last name is required!',
    })
    .min(3, 'Last name must be at least 3 characters long!')
    .max(20, 'Last name must be at most 20 characters long!'),
  username: z
    .string({
      required_error: 'Username is required!',
    })
    .min(3, 'Username must be at least 3 characters long!')
    .max(20, 'Username must be at most 20 characters long!'),
});
