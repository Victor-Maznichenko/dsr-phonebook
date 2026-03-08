import z from 'zod';
import { schemas } from '@/shared/lib';

export const schema = z.object({
  oldPassword: schemas.password,
  newPassword: schemas.password
});
