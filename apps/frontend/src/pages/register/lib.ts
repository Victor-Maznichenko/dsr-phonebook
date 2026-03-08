import z from 'zod';
import { schemas } from '@/shared/lib';
import { DEPARTMENTS, GRADE } from '@/shared/lib/constants';

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

export const departmentItems = [
  {
    label: 'Разработка',
    value: DEPARTMENTS.Development
  },
  {
    label: 'Подбор персонала',
    value: DEPARTMENTS.HR
  },
  {
    label: 'Реклама',
    value: DEPARTMENTS.Marketing
  },
  {
    label: 'Продажи',
    value: DEPARTMENTS.Sales
  },
  {
    label: 'Поддержка',
    value: DEPARTMENTS.Support
  }
];

export const gradeItems = [
  {
    label: 'Intern',
    value: GRADE.Intern
  },
  {
    label: 'Junior',
    value: GRADE.Junior
  },
  {
    label: 'Middle',
    value: GRADE.Middle
  },
  {
    label: 'Senior',
    value: GRADE.Senior
  },
  {
    label: 'Lead',
    value: GRADE.Lead
  }
];
