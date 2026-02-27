import { IsEmail, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

import { UserPersonalBaseDto } from './user-personal-base.dto';

export class CreateUserDto extends UserPersonalBaseDto {
  @IsEmail({}, { message: ValidationMessage.INVALID_EMAIL_FORMAT })
  declare readonly email: string;

  @IsString({ message: ValidationMessage.PASSWORD_MUST_BE_STRING })
  @Length(8, 16, {
    message: ValidationMessage.PASSWORD_LENGTH,
  })
  declare readonly password: string;
}
