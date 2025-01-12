import {z} from 'zod';

import {SignUpSchema} from './signUp.schema';

export type SignUpFormData = z.infer<typeof SignUpSchema>;
