import { ApiProperty } from '@nestjs/swagger';

import { AccessRequestResponseDto } from './access-request-response.dto';

/** Ответ со списком запросов на доступ (пагинация) */
export class AccessRequestListResponseDto {
  @ApiProperty({ description: 'Общее количество записей', example: 42 })
  declare count: number;

  @ApiProperty({ description: 'Элементы списка', type: () => AccessRequestResponseDto, isArray: true })
  declare rows: AccessRequestResponseDto[];
}
