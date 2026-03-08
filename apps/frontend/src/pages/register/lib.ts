import z from 'zod';
import { schemas } from '@/shared/lib';

export const schema = z.object({
  firstName: schemas.firstName,
  lastName: schemas.lastName,
  email: schemas.email,
  password: schemas.password,
  workPhone: schemas.phone,
  department: schemas.department,
  grade: schemas.grade,
  about: schemas.about.optional()
});
