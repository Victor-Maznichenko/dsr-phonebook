export const DEPARTMENTS = {
  HR: 'hr',
  Sales: 'sales',
  Support: 'support',
  Marketing: 'marketing',
  Development: 'development'
} as const;

export const ROLES = {
  Admin: 'admin',
  Default: 'default'
} as const;

export const GRADE = {
  Intern: 'intern',
  Junior: 'junior',
  Middle: 'middle',
  Senior: 'senior',
  Lead: 'lead'
} as const;

export const DEPARTMENTS_LABELS = {
  [DEPARTMENTS.HR]: 'Подбор персонала',
  [DEPARTMENTS.Sales]: 'Реклама',
  [DEPARTMENTS.Support]: 'Поддержка',
  [DEPARTMENTS.Marketing]: 'Продажи',
  [DEPARTMENTS.Development]: 'Разработка'
} as const;

export const GRADE_LABELS = {
  [GRADE.Intern]: 'Intern',
  [GRADE.Junior]: 'Junior',
  [GRADE.Middle]: 'Middle',
  [GRADE.Senior]: 'Senior',
  [GRADE.Lead]: 'Lead'
} as const;

export const departmentItems = [
  { label: 'Разработка', value: DEPARTMENTS.Development },
  { label: 'Подбор персонала', value: DEPARTMENTS.HR },
  { label: 'Реклама', value: DEPARTMENTS.Marketing },
  { label: 'Продажи', value: DEPARTMENTS.Sales },
  { label: 'Поддержка', value: DEPARTMENTS.Support }
];

export const gradeItems = [
  { label: 'Intern', value: GRADE.Intern },
  { label: 'Junior', value: GRADE.Junior },
  { label: 'Middle', value: GRADE.Middle },
  { label: 'Senior', value: GRADE.Senior },
  { label: 'Lead', value: GRADE.Lead }
];

export const ACCESS_REQUEST_STATUS = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected'
} as const;

export type AccessRequestStatus = typeof ACCESS_REQUEST_STATUS[keyof typeof ACCESS_REQUEST_STATUS];
export type DepartmentValue = typeof DEPARTMENTS[keyof typeof DEPARTMENTS];
export type GradeValue = typeof GRADE[keyof typeof GRADE];
