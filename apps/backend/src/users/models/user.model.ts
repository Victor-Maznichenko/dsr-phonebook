import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AccessRequest } from 'src/access-request/models/access-request.model';

interface UserCreationAttrs {
  role: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  personalPhones: string[];
  department: string;
  grade: string;
  officeAddress: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  // @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  // @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  // @ApiProperty({example: '12345678', description: 'Пароль'})
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare workPhone: string;

  declare personalPhones: string[];

  @Column({ type: DataType.STRING, allowNull: false })
  declare department: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare grade: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare officeAddress: string;

  @Column({ type: DataType.STRING })
  declare about: string;

  @Column({ type: DataType.STRING })
  declare avatar: string;

  @HasMany(() => AccessRequest, 'targetUserId')
  declare incomingRequests: AccessRequest[];

  @Column({ type: DataType.STRING })
  declare hasPersonalAccess: boolean;
}
