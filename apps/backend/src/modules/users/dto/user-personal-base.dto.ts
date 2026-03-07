import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class UserPersonalBaseDto {
  @ApiProperty({ description: 'Имя', example: 'Иван', minLength: 2, maxLength: 50 })
  @IsString({ message: ValidationMessage.FIRST_NAME_MUST_BE_STRING })
  @Length(2, 50, {
    message: ValidationMessage.FIRST_NAME_LENGTH,
  })
  declare readonly firstName: string;

  @ApiProperty({ description: 'Фамилия', example: 'Иванов', minLength: 2, maxLength: 50 })
  @IsString({ message: ValidationMessage.LAST_NAME_MUST_BE_STRING })
  @Length(2, 50, {
    message: ValidationMessage.LAST_NAME_LENGTH,
  })
  declare readonly lastName: string;

  @ApiProperty({ description: 'Рабочий телефон', example: '+7 (999) 123-45-67' })
  @IsString({ message: ValidationMessage.WORK_PHONE_MUST_BE_STRING })
  declare readonly workPhone: string;

  @ApiProperty({
    description: 'Личные телефоны',
    example: ['+7 (999) 111-22-33'],
    type: [String],
  })
  @IsArray({ message: ValidationMessage.PERSONAL_PHONES_MUST_BE_ARRAY })
  @IsString({ each: true, message: ValidationMessage.PERSONAL_PHONE_MUST_BE_STRING })
  declare readonly personalPhones: string[];

  @ApiProperty({ description: 'Подразделение', example: 'Отдел разработки' })
  @IsString({ message: ValidationMessage.DEPARTMENT_MUST_BE_STRING })
  declare readonly department: string;

  @ApiProperty({ description: 'Грейд/должность', example: 'Middle' })
  @IsString({ message: ValidationMessage.GRADE_MUST_BE_STRING })
  declare readonly grade: string;

  @ApiProperty({ description: 'Адрес офиса', example: 'Москва, офис 123' })
  @IsString({ message: ValidationMessage.OFFICE_ADDRESS_MUST_BE_STRING })
  declare readonly officeAddress: string;

  @ApiProperty({ description: 'Дата рождения (ISO 8601)', example: '1990-01-01' })
  @IsDateString({}, { message: ValidationMessage.BIRTHDAY_MUST_BE_DATE })
  declare readonly birthday: string;
}
