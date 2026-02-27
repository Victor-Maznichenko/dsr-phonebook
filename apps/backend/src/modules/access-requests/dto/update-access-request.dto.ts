import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

import { AccessRequestStatus } from '../lib';

export class UpdateAccessRequestDto {
  @ApiProperty({
    enum: AccessRequestStatus,
    description: 'Новый статус заявки на доступ',
    example: AccessRequestStatus.APPROVED,
  })
  @IsEnum(AccessRequestStatus, {
    message: ValidationMessage.ACCESS_REQUEST_STATUS_INVALID,
  })
  declare readonly status: AccessRequestStatus;
}