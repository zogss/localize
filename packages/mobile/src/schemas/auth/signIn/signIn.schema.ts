import { z } from 'zod';

export const PhoneSchema = z.object({
  phoneNumber: z
    .string({
      required_error: 'Phone number is required!',
    })
    .min(1, 'Phone number is required!')
    .regex(/^(\d{2})9(\d{4})(\d{4})$/, 'Invalid phone number!'),
});

export const CodeSchema = z.object({
  code: z
    .string({
      required_error: 'Code is required!',
    })
    .min(6, 'Code must be 6 digits!'),
});
