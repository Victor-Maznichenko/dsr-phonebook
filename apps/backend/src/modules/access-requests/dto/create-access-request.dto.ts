import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class CreateAccessRequestDto {
  @ApiProperty({ example: 1, description: 'Идентификатор пользователя, к которому запрашивается доступ' })
  @IsInt({ message: ValidationMessage.TARGET_USER_ID_MUST_BE_INT })
  @IsPositive({ message: ValidationMessage.TARGET_USER_ID_MUST_BE_POSITIVE })
  declare readonly targetUserId: number;
}
