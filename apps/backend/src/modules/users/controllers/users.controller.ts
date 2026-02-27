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
import { plainToClass, plainToInstance } from 'class-transformer';

import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';

import { UpdateCredentialsDto, UpdatePersonalDto, UserCompactDto, UserDetailDto, UsersFiltersDto } from '../dto';
import { UsersService } from '../users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /* 
  ===================
  Получить всех пользователей
  ===================
  */
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll(@Query() dto: UsersFiltersDto)  {
    const search = dto.search ?? '';
    const offset = dto.offset ?? 0;
    const limit = dto.limit ?? 10;

    const users = await this.usersService.getAll({ offset, limit, search });
    return users.map(u => plainToInstance(UserCompactDto, u.get({ plain: true })));
  }

  /* 
  ===================
  Получить пользователя по id
  ===================
  */
  @Get(':id')
  async getById(@Param('id') id: string, @Req() { user }) {
    const targetUser = await this.usersService.getById(+id);
    const hasAccess = +user.id === +id;
    // const hasAccess = await this.accessService.checkAccess(user.id, targetUser.id);

    // Преобразуем модель в DTO
    const userDto = plainToClass(UserDetailDto, targetUser, { excludeExtraneousValues: true });

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
  patchCredentitals(@Param('id') id: string, @Body() updateCredentialsDto: UpdateCredentialsDto) {
    return this.usersService.patchCredentials(+id, updateCredentialsDto);
  }

  /* 
  ===================
  [ADMIN] Изменить личные данные пользователя по id 
  ===================
  */
  @Roles(Role.ADMIN)
  @Patch(':id/personal')
  @UseInterceptors(ClassSerializerInterceptor)
  async patchPersonalData(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
    const updatedFields = await this.usersService.patchPersonalData(+id, updatePersonalDto);
    return plainToInstance(UpdatePersonalDto, updatedFields);
  }
  /* 
  ===================
  [ADMIN] Изменить личные данные пользователя по id 
  ===================
  */
  // @Roles(Role.ADMIN)
  // @Patch(':id')
  // patchPersonalData(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
  //   return this.usersService.patchPersonalData(+id, updateCredentialsDto);
  // }

  /* 
  ===================
  [ADMIN] Удалить пользователя по id 
  ===================
  */
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.(+id, updateUserDto);
  // }
}
