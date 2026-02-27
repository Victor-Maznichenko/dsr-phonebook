import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { UserPersonalBaseDto } from './user-personal-base.dto';

export class UpdatePersonalDto extends PartialType(UserPersonalBaseDto) {
  @IsOptional()
  @IsString()
  declare readonly about?: string;

  @IsOptional()
  @IsBoolean()
  declare readonly hasPersonalAccess?: boolean;
}
