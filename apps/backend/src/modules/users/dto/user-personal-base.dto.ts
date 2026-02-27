import { IsArray, IsDateString, IsString, Length } from 'class-validator';

import { ValidationMessage } from '@/shared/constants';

export class UserPersonalBaseDto {
  @IsString({ message: ValidationMessage.FIRST_NAME_MUST_BE_STRING })
  @Length(2, 50, {
    message: ValidationMessage.FIRST_NAME_LENGTH,
  })
  declare readonly firstName: string;

  @IsString({ message: ValidationMessage.LAST_NAME_MUST_BE_STRING })
  @Length(2, 50, {
    message: ValidationMessage.LAST_NAME_LENGTH,
  })
  declare readonly lastName: string;

  @IsString({ message: ValidationMessage.WORK_PHONE_MUST_BE_STRING })
  declare readonly workPhone: string;

  @IsArray({ message: ValidationMessage.PERSONAL_PHONES_MUST_BE_ARRAY })
  @IsString({ each: true, message: ValidationMessage.PERSONAL_PHONE_MUST_BE_STRING })
  declare readonly personalPhones: string[];

  @IsString({ message: ValidationMessage.DEPARTMENT_MUST_BE_STRING })
  declare readonly department: string;

  @IsString({ message: ValidationMessage.GRADE_MUST_BE_STRING })
  declare readonly grade: string;

  @IsString({ message: ValidationMessage.OFFICE_ADDRESS_MUST_BE_STRING })
  declare readonly officeAddress: string;

  @IsDateString({}, { message: ValidationMessage.BIRTHDAY_MUST_BE_DATE })
  declare readonly birthday: string;
}
