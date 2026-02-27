import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class LoginDto {
  @IsEmail({}, { message: ValidationMessage.INVALID_EMAIL_FORMAT })
  @IsNotEmpty({ message: ValidationMessage.EMAIL_REQUIRED })
  declare readonly email: string;

  @IsString({ message: ValidationMessage.PASSWORD_MUST_BE_STRING })
  @Length(8, 16, {
    message: ValidationMessage.PASSWORD_LENGTH,
  })
  @IsNotEmpty({ message: ValidationMessage.PASSWORD_REQUIRED })
  declare readonly password: string;
}
