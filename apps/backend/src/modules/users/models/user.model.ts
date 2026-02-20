import { Exclude, Expose } from 'class-transformer';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
// import { AccessRequest } from 'src/access-request/models/access-request.model';

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
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  // @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Expose({ groups: ['compact'] })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  // @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  // @ApiProperty({example: '12345678', description: 'Пароль'})
  @Exclude()
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare workPhone: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare personalPhones: string[] | [];

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare department: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare grade: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare officeAddress: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING, allowNull: false })
  declare birthday: string;

  @Expose({ groups: ['detail'] })
  @Column({ type: DataType.STRING })
  declare about: string;

  @Expose({ groups: ['compact'] })
  @Column({ type: DataType.STRING })
  declare avatar: string;

  @Column({ type: DataType.STRING })
  declare hasPersonalAccess: boolean;

  // @HasMany(() => AccessRequest, 'targetUserId')
  // declare incomingRequests: AccessRequest[];
}

export type TokenPayload = Pick<User, 'email' | 'id' | 'role'>;
