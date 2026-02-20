import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse {
  @ApiProperty({
    description: 'Номер текущей страницы (начиная с 1)',
    example: 1
  })
  declare page: number;

  @ApiProperty({
    description: 'Количество элементов на страницу',
    example: 10
  })
  declare offset: number;

  @ApiProperty({
    description: 'Общее количество элементов',
    example: 100
  })
  declare itemCount: number;

  @ApiProperty({
    description: 'Общее количество страниц (зависит от offset и limit)',
    example: 10
  })
  declare pageCount: number;

  @ApiProperty({
    description: 'Сигнализирует о доступности предыдущей страницы',
    example: true
  })
  declare prev: boolean;

  @ApiProperty({
    description: 'Сигнализирует о доступности следующей страницы',
    example: false
  })
  declare next: boolean;
}
