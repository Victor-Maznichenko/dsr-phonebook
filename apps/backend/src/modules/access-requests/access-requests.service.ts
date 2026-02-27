import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BaseService, PaginationDto } from '@/shared/utils';

import { AccessRequest } from './access-request.model';
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
  async getAll(query: PaginationDto) {
    const { offset, limit } = query;
    const attributes = ['id', 'email', 'firstName', 'lastName', 'avatar'];

    const requests = await AccessRequest.findAndCountAll({
      include: [
        { association: 'grantee', attributes },
        { association: 'target', attributes },
      ],
      limit,
      offset
    });
    
    return requests;
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
}
