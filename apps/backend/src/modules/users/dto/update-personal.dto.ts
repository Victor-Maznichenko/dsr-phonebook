import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

import { UserPersonalBaseDto } from './user-personal-base.dto';

export class UpdatePersonalDto extends PartialType(UserPersonalBaseDto) {
  @IsOptional()
  @IsString({ message: ValidationMessage.ABOUT_MUST_BE_STRING })
  declare readonly about?: string;
}
