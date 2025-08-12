import { z } from 'zod';

export const CreateClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0),
  status: z.boolean().optional().default(true),
  familyProfile: z.string().optional().default(''),
});

export const UpdateClientSchema = CreateClientSchema.partial();
