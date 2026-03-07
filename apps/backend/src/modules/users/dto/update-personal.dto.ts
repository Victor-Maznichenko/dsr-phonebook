import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

import { UserPersonalBaseDto } from './user-personal-base.dto';

export class UpdatePersonalDto extends PartialType(UserPersonalBaseDto) {
  @ApiPropertyOptional({ description: 'О себе', example: 'Backend-разработчик' })
  @IsOptional()
  @IsString({ message: ValidationMessage.ABOUT_MUST_BE_STRING })
  declare readonly about?: string;
}
