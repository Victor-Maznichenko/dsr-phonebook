import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '@/shared/utils';

export class RequestsFiltersDto extends PaginationDto {
  @ApiProperty({
    description: 'Статус запроса',
    example: "pending",
    required: false,
  })
  @IsString()
  @IsOptional()
  declare status?: string;
}
