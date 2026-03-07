import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class UpdateCredentialsDto {
  @ApiPropertyOptional({ description: 'Новый email', example: 'newuser@example.com' })
  @IsOptional()
  @IsEmail({}, { message: ValidationMessage.INVALID_EMAIL_FORMAT })
  declare readonly email?: string;

  @ApiPropertyOptional({
    description: 'Новый пароль (8–15 символов)',
    example: 'NewSecurePass1',
    minLength: 8,
    maxLength: 15,
  })
  @IsOptional()
  @IsString({ message: ValidationMessage.NEW_PASSWORD_MUST_BE_STRING })
  @Length(8, 15, {
    message: ValidationMessage.NEW_PASSWORD_LENGTH,
  })
  declare readonly newPassword?: string;

  @ApiPropertyOptional({
    description: 'Текущий пароль (нужен при смене пароля)',
    example: 'SecurePass1',
    minLength: 8,
    maxLength: 15,
  })
  @IsOptional()
  @IsString({ message: ValidationMessage.OLD_PASSWORD_MUST_BE_STRING })
  @Length(8, 15, {
    message: ValidationMessage.OLD_PASSWORD_LENGTH,
  })
  declare readonly oldPassword?: string;
}
