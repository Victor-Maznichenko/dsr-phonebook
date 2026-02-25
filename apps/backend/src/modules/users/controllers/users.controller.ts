import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';

import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';

import { UserCompactDto } from '../dto/user-compact-dto';
import { UserDetailDto } from '../dto/user-detail-dto';
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
  async getAll() {
    const users = await this.usersService.getAll();
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

  // При изменении возвращается новый обьект
  // @Roles(Role.ADMIN)
  // @Patch(':id/personal')
  // patchPersonalData(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
  //   return this.usersService.patchPersonalData(+id, updatePersonalDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.(+id, updateUserDto);
  // }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeById(+id);
  }
}
