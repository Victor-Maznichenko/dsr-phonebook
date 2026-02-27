import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';

import { BaseService } from '@/shared/utils';

import { AccessRequest } from './access-request.model';
import { RequestsFiltersDto } from './dto';
import { AccessRequestStatus } from './lib';

@Injectable()
export class AccessRequestsService extends BaseService<AccessRequest>  {
  constructor(@InjectModel(AccessRequest) private requestModel: typeof AccessRequest) {
    super(requestModel);
  }

  /* 
  ===================
  Создание запроса
  ===================
  */
  async create(granteeUserId: number, targetUserId: number) {
    if(granteeUserId === targetUserId) {
      throw new BadRequestException('Нельзя создать запрос на себя');
    }

    const existing = await AccessRequest.findOne({
      where: { granteeUserId, targetUserId, status: AccessRequestStatus.PENDING },
    });

    if (existing) {
      throw new BadRequestException('Запрос уже отправлен и ожидает рассмотрения');
    }

    const request = await AccessRequest.create({ granteeUserId, targetUserId });
    return request;
  }

  /* 
  ===================
  Получить все запросы
  ===================
  */
  async getAll({ offset, limit, status }: Required<RequestsFiltersDto>) {
    const attributes = ['id', 'email', 'firstName', 'lastName', 'avatar'];
    const where: WhereOptions<AccessRequest> = {};

    if(Object.values(AccessRequestStatus).includes(status as AccessRequestStatus)) {
      where.status = status;
    }

    const requests = await this.requestModel.findAndCountAll({
      include: [
        { association: 'grantee', attributes },
        { association: 'target', attributes },
      ],
      limit,
      offset,
      where
    });
    
    return requests;
  }

  /* 
  ===================
  Получить исходящие запросы по userId
  ===================
  */
  async getOutgoingForUser(userId: number, { offset, limit, status }: Required<RequestsFiltersDto>) {
    const attributes = ['id', 'email', 'firstName', 'lastName', 'avatar'];
    const where: WhereOptions<AccessRequest> = { granteeUserId: userId };

    if(Object.values(AccessRequestStatus).includes(status as AccessRequestStatus)) {
      where.status = status;
    }

    return await this.requestModel.findAndCountAll({
      include: [
        { association: 'grantee', attributes },
        { association: 'target', attributes },
      ],
      limit,
      offset,
      where,
      order: [['createdAt', 'DESC']],
    });
  }

  /* 
  ===================
  Получить входящие запросы по userId
  ===================
  */
  async getIncomingForUser(userId: number, { offset, limit, status }: Required<RequestsFiltersDto>) {
    const attributes = ['id', 'email', 'firstName', 'lastName', 'avatar'];
    const where: WhereOptions<AccessRequest> = { targetUserId: userId };

    if(Object.values(AccessRequestStatus).includes(status as AccessRequestStatus)) {
      where.status = status;
    }

    return await this.requestModel.findAndCountAll({
      include: [
        { association: 'grantee', attributes },
        { association: 'target', attributes },
      ],
      limit,
      offset,
      where,
      order: [['createdAt', 'DESC']],
    });
  }

  /* 
  ===================
  Получить запрос по id
  ===================
  */
  async getById(id: number) {
    const request = await this.requestModel.findByPk(id);

    if (!request) {
      throw new NotFoundException('Запрос не найден');
    }

    return request;
  }

  /* 
  ===================
  Обновить статус запроса
  ===================
  */
  async updateStatus(id: number, newStatus: AccessRequestStatus) {
    const request = await this.getById(id);
    request.status = newStatus;
    await request.save();
    return request;
  }

  /* 
  ===================
  Удаление запроса
  ===================
  */
  async removeById(id: number) {
    return await this.requestModel.destroy({ where: { id } });
  }

  /* 
  ===================
  Проверить доступ
  ===================
  */
  async checkAccess(granteeUserId: number, targetUserId: number): Promise<boolean> {
    if (granteeUserId === targetUserId) {
      return true;
    }

    const request = await this.requestModel.findOne({
      where: {
        granteeUserId,
        targetUserId,
        status: AccessRequestStatus.APPROVED,
      },
    });

    return !!request;
  }

}
