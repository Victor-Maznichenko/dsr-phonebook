import type { Response } from 'express';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UpdateCredentialsDto, UpdatePersonalDto, UserDetailDto } from '../dto';
import { UsersService } from '../users.service';

@ApiTags('Профиль')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  /*
  =========== Получить профиль =========== 
  */
  @Get()
  @ApiOperation({ summary: 'Получить профиль текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Профиль пользователя успешно получен', type: UserDetailDto })
  async getProfile(@Req() { user }) {
    const targetUser = await this.usersService.getById(+user.id);
    return plainToInstance(UserDetailDto, targetUser, { excludeExtraneousValues: true });
  }

  /*   
  =========== Удлалить профиль =========== 
  */
  @Delete()
  @ApiOperation({ summary: 'Удалить профиль текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Профиль пользователя успешно удалён' })
  async removeProfile(@Req() { user }, @Res({ passthrough: true }) response: Response) {
    await this.usersService.removeById(+user.id);
    response.cookie('refresh_token', '', { maxAge: 0 });
  }

  /*   
  =========== Обновить учетные данные профиля =========== 
  */
  @Patch('credentials')
  @ApiOperation({ summary: 'Обновить учетные данные текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Учетные данные успешно обновлены' })
  patchCredentials(@Req() { user }, @Body() dto: UpdateCredentialsDto) {
    return this.usersService.patchCredentials(+user.id, dto);
  }
  
  /* 
  ===================
  Изменить личные данные профиля по id 
  ===================
  */
  @Patch('personal')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Обновить личные данные текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Личные данные успешно обновлены', type: UpdatePersonalDto })
  async patchPersonalData(@Req() { user }, @Body() dto: UpdatePersonalDto) {
    const updatedFields = await this.usersService.patchPersonalData(+user.id, dto);
    return plainToInstance(UpdatePersonalDto, updatedFields);
  }
}
