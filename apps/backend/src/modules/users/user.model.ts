import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  birthday: string;
  department: string;
  email: string;
  firstName: string;
  grade: string;
  lastName: string;
  officeAddress: string;
  password: string;
  personalPhones: string[];
  role: string;
  workPhone: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Рабочий почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({ example: 'user', description: 'Роль в системе' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @ApiProperty({ example: '+7 (999) 123-45-67', description: 'Рабочий телефон' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare workPhone: string;

  @ApiProperty({
    example: ['+7 (900) 111-22-33'],
    description: 'Личные телефоны',
    required: false,
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare personalPhones: string[] | [];

  @ApiProperty({ example: 'Отдел разработки', description: 'Подразделение' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare department: string;

  @ApiProperty({ example: 'Middle', description: 'Грейд/должность' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare grade: string;

  @ApiProperty({ example: 'Москва, офис 123', description: 'Рабочий адрес/офис' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare officeAddress: string;

  @ApiProperty({ example: '1990-01-01', description: 'Дата рождения' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare birthday: string;

  @ApiProperty({
    example: 'Люблю писать чистый код и помогать коллегам.',
    description: 'Краткая информация о пользователе',
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare about: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'URL аватара',
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare avatar: string;

  @ApiProperty({
    example: true,
    description: 'Флаг, есть ли личный доступ к данным',
    required: false,
  })
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  declare hasPersonalAccess: boolean;
}
