import { IsArray, IsBoolean, IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePersonalDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName?: string;

  @IsOptional()
  @IsString()
  workPhone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  personalPhones?: string[];

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  officeAddress?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsBoolean()
  hasPersonalAccess?: boolean;
}
