import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';

import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';

import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto, RequestsFiltersDto, UpdateAccessRequestDto } from './dto';
import { AccessRequestStatus } from './lib';

@Controller('requests')
export class AccessRequestsController {
  constructor(private readonly requestsService: AccessRequestsService) {}

  /* 
  ===================
  Создание запроса
  ===================
  */
  @Roles(Role.DEFAULT)
  @Post()
  create(@Req() request: RequestWithUser, @Body() dto: CreateAccessRequestDto) {
    return this.requestsService.create(+request.user.id, +dto.targetUserId);
  }

  /* 
  ===================
  Обновить статус запроса
  ===================
  */
  @Patch(':id')
  async update(@Param('id') id: string, @Req() request: RequestWithUser, @Body() dto: UpdateAccessRequestDto) {
    if(dto.status === AccessRequestStatus.PENDING) {
      throw new BadRequestException('Запрос уже находится в статусе ожидания');
    }

    const accessRequest = await this.requestsService.getById(+id);
    const isAdmin = request.user.role === Role.ADMIN;
    const isTargetUser = +accessRequest.targetUserId === +request.user.id;

    if(!isAdmin && !isTargetUser) {
      throw new ForbiddenException('У вас нет прав на изменение статуса этого запроса');
    }

    return this.requestsService.updateStatus(+id, dto.status);
  }

  /* 
  ===================
  Получить исходящие запросы по userId
  ===================
  */
  @Get('outgoing')
  getOutgoing(@Req() request: RequestWithUser, @Query() dto: RequestsFiltersDto & { userId?: number; }) {
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;
    const status = dto.status ?? '';
    const userId = dto.userId ?? -1;

    const isAdmin = request.user.role === Role.ADMIN;
    const isSelf = +request.user.id === +userId;

    if(userId < 1) {
      throw new BadRequestException('Неверный query-параметр userId')
    }

    if(isAdmin || isSelf) {
      return this.requestsService.getOutgoingForUser(+userId, { offset, limit, status });
    }

    throw new ForbiddenException('Нет доступа к запросам этого пользователя');
  }

  /* 
  ===================
  Получить входящие запросы по userId
  ===================
  */
  @Roles(Role.DEFAULT)
  @Get('incoming')
  getIncoming(@Req() request: RequestWithUser, @Query() dto: RequestsFiltersDto & { userId?: number; }) {
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;
    const status = dto.status ?? '';
    let userId = dto.userId ?? -1;

    const isAdmin = request.user.role === Role.ADMIN;
    const isSelf = +request.user.id === +userId;

    if(isAdmin && userId < 1) {
      userId = +request.user.id;
    }

    if(isAdmin || isSelf) {
      return this.requestsService.getIncomingForUser(+userId, { offset, limit, status });
    }

    throw new ForbiddenException('Нет доступа к запросам этого пользователя');
  }

  /* 
  ===================
  [ADMIN] Получить все запросы
  ===================
  */
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() dto: RequestsFiltersDto) {
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;
    const status = dto.status ?? '';
    return this.requestsService.getAll({offset, limit, status});
  }

  /* 
  ===================
  Удалить запрос
  ===================
  */
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const accessRequest = await this.requestsService.getById(+id);
    const isAdmin = request.user.role === Role.ADMIN;
    const isCreator = +accessRequest.granteeUserId === +request.user.id;

    if (!isAdmin && !isCreator) {
      throw new ForbiddenException('У вас нет прав на удаление этого запроса');
    }

    return this.requestsService.removeById(+id);
  }
}
