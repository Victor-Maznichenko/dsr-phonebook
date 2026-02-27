import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { AccessRequestsService } from '@/modules/access-requests/access-requests.service';
import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';

import { UpdateCredentialsDto, UpdatePersonalDto, UserCompactDto, UserDetailDto, UsersFiltersDto } from '../dto';
import { UsersService } from '../users.service';

@ApiTags('Пользователи')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly accessService: AccessRequestsService) { }

  /* 
  ===================
  Получить всех пользователей
  ===================
  */
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей успешно получен',
    type: UserCompactDto,
    isArray: true,
  })
  async getAll(@Query() dto: UsersFiltersDto)  {
    const search = dto.search ?? '';
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;

    const users = await this.usersService.getAll({ offset, limit, search });
    return users.map(u => plainToInstance(
      UserCompactDto, 
      u.get({ plain: true }), 
      { excludeExtraneousValues: true }
    ));
  }

  /* 
  ===================
  Получить пользователя по id
  ===================
  */
  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по идентификатору' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно получен', type: UserDetailDto })
  @ApiResponse({ status: 403, description: 'Нет доступа к личным данным пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async getById(@Param('id') id: string, @Req() { user }) {
    const targetUser = await this.usersService.getById(+id);
    const hasAccess = await this.accessService.checkAccess(+user.id, +targetUser.id);

    // Преобразуем модель в DTO
    const userDto = plainToInstance(UserDetailDto, targetUser, { excludeExtraneousValues: true });

    // Заменяем конфиденциальные данные на безопасные значения
    if (!hasAccess) {
      userDto.personalPhones = [];
      userDto.hasPersonalAccess = false;
    }

    userDto.hasPersonalAccess = true;
    return userDto;
  }

  /* 
  ===================
  [ADMIN] Изменить учетные данные пользователя по id 
  ===================
  */
  @Roles(Role.ADMIN)
  @Patch(':id/credentials')
  @ApiOperation({ summary: '[ADMIN] Обновить учетные данные пользователя' })
  @ApiResponse({ status: 200, description: 'Учетные данные пользователя успешно обновлены' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для изменения учетных данных' })
  patchCredentials(@Param('id') id: string, @Body() dto: UpdateCredentialsDto) {
    return this.usersService.patchCredentials(+id, dto);
  }

  /* 
  ===================
  [ADMIN] Изменить личные данные пользователя по id 
  ===================
  */
  @Roles(Role.ADMIN)
  @Patch(':id/personal')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '[ADMIN] Обновить личные данные пользователя' })
  @ApiResponse({ status: 200, description: 'Личные данные пользователя успешно обновлены', type: UpdatePersonalDto })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для изменения личных данных' })
  async patchPersonalData(@Param('id') id: string, @Body() dto: UpdatePersonalDto) {
    const updatedFields = await this.usersService.patchPersonalData(+id, dto);
    return plainToInstance(UpdatePersonalDto, updatedFields);
  }

  /* 
  ===================
  [ADMIN] Удалить пользователя по id 
  ===================
  */
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: '[ADMIN] Удалить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удалён' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления пользователя' })
  remove(@Param('id') id: string) {
    return this.usersService.removeById(+id);
  }
}
