import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class UpdateCredentialsDto {
  @IsOptional()
  @IsEmail({}, { message: ValidationMessage.INVALID_EMAIL_FORMAT })
  declare readonly email?: string;

  @IsOptional()
  @IsString({ message: ValidationMessage.NEW_PASSWORD_MUST_BE_STRING })
  @Length(8, 16, {
    message: ValidationMessage.NEW_PASSWORD_LENGTH,
  })
  declare readonly newPassword?: string;

  @IsOptional()
  @IsString({ message: ValidationMessage.OLD_PASSWORD_MUST_BE_STRING })
  @Length(8, 16, {
    message: ValidationMessage.OLD_PASSWORD_LENGTH,
  })
  declare readonly oldPassword?: string;
}
