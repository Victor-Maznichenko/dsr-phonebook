import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreateAccessRequestDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @IsInt()
    @IsPositive()
    declare readonly targetUserId: number;
}
