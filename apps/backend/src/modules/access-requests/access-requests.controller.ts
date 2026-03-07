import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';

import { AccessRequestsService } from './access-requests.service';
import {
  AccessRequestListResponseDto,
  AccessRequestResponseDto,
  CreateAccessRequestDto,
  RequestsFiltersDto,
  UpdateAccessRequestDto,
} from './dto';
import { AccessRequestStatus } from './lib';

@ApiTags('Запросы доступа')
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
  @ApiOperation({ operationId: 'postRequest', summary: 'Создать запрос на доступ к персональным данным пользователя' })
  @ApiResponse({ status: 201, description: 'Запрос на доступ успешно создан', type: AccessRequestResponseDto })
  @ApiResponse({ status: 400, description: 'Запрос уже отправлен и ожидает рассмотрения' })
  create(@Req() request: RequestWithUser, @Body() dto: CreateAccessRequestDto) {
    return this.requestsService.create(+request.user.id, +dto.targetUserId);
  }

  /* 
  ===================
  Обновить статус запроса
  ===================
  */
  @Patch(':id')
  @ApiOperation({ operationId: 'patchRequestById', summary: 'Обновить статус запроса на доступ' })
  @ApiResponse({ status: 200, description: 'Статус запроса успешно обновлён', type: AccessRequestResponseDto })
  @ApiResponse({ status: 400, description: 'Некорректный новый статус запроса' })
  @ApiResponse({ status: 403, description: 'Нет прав для изменения статуса запроса' })
  async update(@Param('id') id: string, @Req() request: RequestWithUser, @Body() dto: UpdateAccessRequestDto) {
    if(dto.status === AccessRequestStatus.PENDING) {
      throw new BadRequestException('Некорректный новый статус запроса');
    }

    const accessRequest = await this.requestsService.getById(+id);
    const isAdmin = request.user.role === Role.ADMIN;
    const isTargetUser = +accessRequest.targetUserId === +request.user.id;

    if(!isAdmin && !isTargetUser) {
      throw new ForbiddenException('Нет прав для изменения статуса запроса');
    }

    return this.requestsService.updateStatus(+id, dto.status);
  }

  /* 
  ===================
  Получить исходящие запросы по userId
  ===================
  */
  @Get('outgoing')
  @ApiOperation({ operationId: 'getOutgoingRequestsByUserId', summary: 'Получить исходящие запросы по идентификатору пользователя' })
  @ApiResponse({ status: 200, description: 'Исходящие запросы успешно получены', type: AccessRequestListResponseDto })
  @ApiResponse({ status: 400, description: 'Некорректный идентификатор пользователя' })
  @ApiResponse({ status: 403, description: 'Нет доступа к запросам указанного пользователя' })
  getOutgoing(@Req() request: RequestWithUser, @Query() dto: RequestsFiltersDto & { userId?: number; }) {
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;
    const status = dto.status ?? '';
    const userId = dto.userId ?? -1;

    const isAdmin = request.user.role === Role.ADMIN;
    const isSelf = +request.user.id === +userId;

    if(userId < 1) {
      throw new BadRequestException('Некорректный идентификатор пользователя')
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
  @ApiOperation({ operationId: 'getIncomingRequestsByUserId', summary: 'Получить входящие запросы по идентификатору пользователя' })
  @ApiResponse({ status: 200, description: 'Входящие запросы успешно получены', type: AccessRequestListResponseDto })
  @ApiResponse({ status: 403, description: 'Нет доступа к запросам указанного пользователя' })
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
  @ApiOperation({ operationId: 'getRequests', summary: '[ADMIN] Получить все запросы на доступ' })
  @ApiResponse({ status: 200, description: 'Список всех запросов успешно получен', type: AccessRequestListResponseDto })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для получения всех запросов' })
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
  @ApiOperation({ operationId: 'deleteRequestById', summary: 'Удалить запрос на доступ' })
  @ApiResponse({ status: 200, description: 'Запрос успешно удалён' })
  @ApiResponse({ status: 403, description: 'Нет прав для удаления запроса' })
  async remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const accessRequest = await this.requestsService.getById(+id);
    const isAdmin = request.user.role === Role.ADMIN;
    const isCreator = +accessRequest.granteeUserId === +request.user.id;

    if (!isAdmin && !isCreator) {
      throw new ForbiddenException('Нет прав для удаления запроса');
    }

    return this.requestsService.removeById(+id);
  }
}
