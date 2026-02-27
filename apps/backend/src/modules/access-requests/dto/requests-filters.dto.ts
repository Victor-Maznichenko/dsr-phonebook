import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';
import { PaginationDto } from '@/shared/utils';

export class RequestsFiltersDto extends PaginationDto {
  @ApiProperty({
    description: 'Статус запроса',
    example: 'pending',
    required: false,
  })
  @IsString({ message: ValidationMessage.REQUEST_STATUS_MUST_BE_STRING })
  @IsOptional()
  declare readonly status?: string;
}
