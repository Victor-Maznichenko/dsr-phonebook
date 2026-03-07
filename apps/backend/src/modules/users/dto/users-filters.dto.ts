import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';
import { PaginationDto } from '@/shared/utils';

export class UsersFiltersDto extends PaginationDto {
  @ApiProperty({
    description: 'Поиск по имени или фамилии пользователя',
    example: 'Виктор',
    required: false,
  })
  @IsString({ message: ValidationMessage.SEARCH_MUST_BE_STRING })
  @IsOptional()
  declare readonly search?: string;
}
