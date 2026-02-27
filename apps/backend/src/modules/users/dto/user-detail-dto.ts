import { PickType } from '@nestjs/mapped-types';

import { UserDto } from './user-dto';

export class UserDetailDto extends PickType(UserDto, [
  'id',
  'email',
  'firstName',
  'lastName',
  'workPhone',
  'department',
  'grade',
  'birthday',
  'avatar',
  'about',
  'personalPhones',
  'hasPersonalAccess',
] as const) {}
