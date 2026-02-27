import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PaginationDto } from '@/shared/utils';

export class UsersFiltersDto extends PaginationDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: "Виктор",
    minimum: 0
  })
  @IsString()
  @IsNotEmpty()
  declare search?: string;
}
