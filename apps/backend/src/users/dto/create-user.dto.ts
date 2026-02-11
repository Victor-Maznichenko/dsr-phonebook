import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  declare readonly email: string;  
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  declare readonly password: string;
}
