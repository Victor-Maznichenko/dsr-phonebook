import { IsArray, IsDateString, IsString, Length } from 'class-validator';

export class UserPersonalBaseDto {
  @IsString()
  @Length(1, 50)
  declare readonly firstName: string;

  @IsString()
  @Length(1, 50)
  declare readonly lastName: string;

  @IsString()
  declare readonly workPhone: string;

  @IsArray()
  @IsString({ each: true })
  declare readonly personalPhones: string[];

  @IsString()
  declare readonly department: string;

  @IsString()
  declare readonly grade: string;

  @IsString()
  declare readonly officeAddress: string;

  @IsDateString()
  declare readonly birthday: string;
}

