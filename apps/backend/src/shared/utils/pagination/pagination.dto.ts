import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Количество элементов которое нужно вернуть на 1 страницу',
    example: 10,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  declare limit?: number;

  @ApiProperty({
    description: 'Количество элементов перед 1-ым которые нужно пропустить',
    example: 0,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  declare offset?: number;
}
