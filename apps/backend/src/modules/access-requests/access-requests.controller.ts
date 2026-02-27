import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';

import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';
import { PaginationDto } from '@/shared/utils';

import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto, UpdateAccessRequestDto } from './dto';
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
  [ADMIN] Получить все запросы
  ===================
  */
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() dto: PaginationDto) {
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;
    return this.requestsService.getAll({offset, limit});
  }

  /* 
  ===================
  [ADMIN] Удалить запрос
  ===================
  */
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.removeById(+id);
  }
}
