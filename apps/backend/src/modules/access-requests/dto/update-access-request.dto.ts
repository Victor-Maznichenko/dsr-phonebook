import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { AccessRequestStatus } from '../lib';

export class UpdateAccessRequestDto {
  @ApiProperty({
    enum: AccessRequestStatus,
    description: 'Новый статус заявки на доступ',
    example: AccessRequestStatus.APPROVED,
  })
  @IsEnum(AccessRequestStatus)
  declare readonly status: AccessRequestStatus;
}