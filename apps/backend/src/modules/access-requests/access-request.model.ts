import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';

import { User } from '@/modules/users/user.model';

import { AccessRequestStatus } from './lib';

@Table({ tableName: 'access_requests' })
export class AccessRequest extends Model {
    @ApiProperty({
        description: 'Уникальный идентификатор запроса доступа',
        example: 1,
    })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        description: 'ID пользователя, который запрашивает доступ',
        example: 10,
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare granteeUserId: number;

    @ApiProperty({
        description: 'ID пользователя, к данным которого запрашивается доступ',
        example: 20,
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare targetUserId: number;

    @ApiProperty({
        description: 'Статус запроса доступа',
        enum: AccessRequestStatus,
        enumName: 'AccessRequestStatus',
        example: AccessRequestStatus.PENDING,
    })
    @Column({
        type: DataType.ENUM(...Object.values(AccessRequestStatus)),
        defaultValue: AccessRequestStatus.PENDING,
        allowNull: false,
    })
    declare status: AccessRequestStatus;

    @ApiProperty({
        description: 'Пользователь, который запрашивает доступ',
        type: () => User,
    })
    @BelongsTo(() => User, { as: 'grantee', foreignKey: 'granteeUserId' })
    declare grantee: User;

    @ApiProperty({
        description: 'Пользователь, к данным которого запрашивается доступ',
        type: () => User,
    })
    @BelongsTo(() => User, { as: 'target', foreignKey: 'targetUserId' })
    declare target: User;
}
