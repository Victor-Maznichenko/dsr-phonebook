import { PickType } from '@nestjs/swagger';

import { UserDto } from './user-dto';

export class UserCompactDto extends PickType(UserDto, [
  'id',
  'email',
  'firstName',
  'lastName',
  'workPhone',
  'department',
  'grade',
  'birthday',
  'avatar',
] as const) {}
