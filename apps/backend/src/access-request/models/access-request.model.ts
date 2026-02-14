import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table({ tableName: 'access_requests' })
export class AccessRequest extends Model<AccessRequest> {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column
  declare granteeUserId: number;

  @Column
  declare targetUserId: number;

  @Column
  declare status: string;

  @BelongsTo(() => User, 'granteeUserId')
  declare grantee: User;

  @BelongsTo(() => User, 'targetUserId')
  declare target: User;
}
