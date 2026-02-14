/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetRequestsDto } from './dto/get-requests.dto';
import { AccessRequest } from './models/access-request.model';

@Injectable()
export class AccessRequestService {
  constructor(
    @InjectModel(AccessRequest)
    private accessRequestModel: typeof AccessRequest,
  ) {}

  private readonly baseAttributes = [
    'id',
    'granteeUserId',
    'targetUserId',
    'status',
  ];

  async findAll(filters: Partial<GetRequestsDto>) {
    const where: any = {};
    if (filters.granteeUserId !== undefined)
      where.granteeUserId = filters.granteeUserId;
    if (filters.targetUserId !== undefined)
      where.targetUserId = filters.targetUserId;
    if (filters.status !== undefined) where.status = filters.status;

    return this.accessRequestModel.findAll({
      where,
      attributes: this.baseAttributes,
      /*       
        Если нужно — можно include с пользовательскими обьектами
        include: [{ model: User, as: 'grantee' }, { model: User, as: 'target' }]
      */
    });
  }

  async getPendingRequestsForUser(userId: number) {
    return this.findAll({
      targetUserId: userId,
      status: 'pending',
    });
  }
}
