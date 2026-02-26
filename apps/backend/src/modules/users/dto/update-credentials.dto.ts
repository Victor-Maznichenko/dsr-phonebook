import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';


export class UpdateCredentialsDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    newPassword?: string;

    @IsOptional()
    @IsString()
    oldPassword?: string;
}
