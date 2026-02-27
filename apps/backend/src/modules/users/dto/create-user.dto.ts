import { IsEmail, IsString, MinLength } from 'class-validator';

import { UserPersonalBaseDto } from './user-personal-base.dto';

export class CreateUserDto extends UserPersonalBaseDto {
  @IsEmail()
  declare readonly email: string;

  @IsString()
  @MinLength(6)
  declare readonly password: string;

}
