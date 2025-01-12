import {z} from 'zod';

import {CodeSchema, PhoneSchema} from './signIn.schema';

export type PhoneFormData = z.infer<typeof PhoneSchema>;

export type CodeFormData = z.infer<typeof CodeSchema>;
