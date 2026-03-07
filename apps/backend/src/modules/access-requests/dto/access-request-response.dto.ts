import { ApiProperty } from '@nestjs/swagger';

import { AccessRequestStatus } from '../lib';
import { AccessRequestUserDto } from './access-request-user.dto';


export class AccessRequestResponseDto {
  @ApiProperty({ description: 'Идентификатор запроса', example: 1 })
  declare id: number;

  @ApiProperty({ description: 'ID пользователя, который запрашивает доступ', example: 10 })
  declare granteeUserId: number;

  @ApiProperty({ description: 'ID пользователя, к данным которого запрашивается доступ', example: 20 })
  declare targetUserId: number;

  @ApiProperty({ description: 'Статус запроса', enum: AccessRequestStatus, example: AccessRequestStatus.PENDING })
  declare status: AccessRequestStatus;

  @ApiProperty({ description: 'Дата создания', example: '2025-03-06T12:00:00.000Z' })
  declare createdAt: Date;

  @ApiProperty({ description: 'Пользователь, который запрашивает доступ', type: AccessRequestUserDto, required: false })
  declare grantee?: AccessRequestUserDto;

  @ApiProperty({ description: 'Пользователь, к данным которого запрашивается доступ', type: AccessRequestUserDto, required: false })
  declare target?: AccessRequestUserDto;
}
