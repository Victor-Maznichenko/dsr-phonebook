// import { IsOptional, IsNumber, IsString } from 'class-validator';
export class GetRequestsDto {
  //   @IsOptional()
  //   @IsNumber()
  declare granteeUserId?: number;

  //   @IsOptional()
  //   @IsNumber()
  declare targetUserId?: number;

  //   @IsOptional()
  //   @IsString()
  declare status?: string;
}
