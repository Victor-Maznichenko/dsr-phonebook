import { PickType } from '@nestjs/swagger';

import { UserDto } from '@/modules/users/dto/user-dto';

export class AccessRequestUserDto extends PickType(UserDto, ['id', 'email', 'firstName', 'lastName', 'avatar'] as const) {}
