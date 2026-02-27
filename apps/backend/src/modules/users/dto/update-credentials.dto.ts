import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';


export class UpdateCredentialsDto {
    @IsOptional()
    @IsEmail()
    declare readonly email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    declare readonly newPassword?: string;

    @IsOptional()
    @IsString()
    declare readonly oldPassword?: string;
}
