import { PickType } from '@nestjs/swagger';

import { UserDto } from './user-dto';

export class AvatarResponseDto extends PickType(UserDto, ['avatar'] as const) {}
