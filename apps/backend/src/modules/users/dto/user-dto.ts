import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
  @Expose() declare id: number;

  @ApiProperty({ description: 'Email', example: 'user@example.com' })
  @Expose() declare email: string;

  @ApiProperty({ description: 'Имя', example: 'Иван' })
  @Expose() declare firstName: string;

  @ApiProperty({ description: 'Фамилия', example: 'Иванов' })
  @Expose() declare lastName: string;

  @ApiProperty({ description: 'Рабочий телефон', example: '+7 (999) 123-45-67' })
  @Expose() declare workPhone: string;

  @ApiProperty({ description: 'Подразделение', example: 'Отдел разработки' })
  @Expose() declare department: string;

  @ApiProperty({ description: 'Грейд/должность', example: 'Middle' })
  @Expose() declare grade: string;

  @ApiProperty({ description: 'Дата рождения', example: '1990-01-01' })
  @Expose() declare birthday: string;

  @ApiProperty({ description: 'URL аватара', example: '/uploads/avatar.png' })
  @Expose() declare avatar: string;

  @ApiProperty({ description: 'О себе', example: 'Backend-разработчик' })
  @Expose() declare about: string;

  @ApiProperty({
    description: 'Личные телефоны (видны при наличии доступа)',
    example: ['+7 (999) 111-22-33'],
    type: [String],
  })
  @Expose() declare personalPhones: string[];

  @ApiProperty({
    description: 'Есть ли у текущего пользователя доступ к личным данным',
    example: true,
  })
  @Expose() declare hasPersonalAccess: boolean;
}

