import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class LoginDto {
  @ApiProperty({ description: 'Email пользователя', example: 'user@example.com' })
  @IsEmail({}, { message: ValidationMessage.INVALID_EMAIL_FORMAT })
  @IsNotEmpty({ message: ValidationMessage.EMAIL_REQUIRED })
  declare readonly email: string;

  @ApiProperty({
    description: 'Пароль (8–15 символов)',
    example: 'SecurePass1',
    minLength: 8,
    maxLength: 15,
  })
  @IsString({ message: ValidationMessage.PASSWORD_MUST_BE_STRING })
  @Length(8, 15, {
    message: ValidationMessage.PASSWORD_LENGTH,
  })
  @IsNotEmpty({ message: ValidationMessage.PASSWORD_REQUIRED })
  declare readonly password: string;
}
