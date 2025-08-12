import { z } from 'zod';

export const CreateGoalSchema = z.object({
  title: z.string().min(1),
  targetValue: z.number().positive(),
  targetDate: z.coerce.date(),
  clientId: z.string().uuid(),
});

export const UpdateGoalSchema = CreateGoalSchema.partial();
