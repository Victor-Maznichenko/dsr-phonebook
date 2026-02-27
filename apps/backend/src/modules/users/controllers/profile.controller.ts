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
import { plainToInstance } from 'class-transformer';

import { UpdateCredentialsDto, UpdatePersonalDto, UserDetailDto } from '../dto';
import { UsersService } from '../users.service';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  /*
  =========== Получить профиль =========== 
  */
  @Get()
  async getProfile(@Req() { user }) {
    const targetUser = await this.usersService.getById(+user.id);
    const userDto = plainToInstance(UserDetailDto, targetUser, { excludeExtraneousValues: true });
    return userDto;
  }

  /*   
  =========== Удлалить профиль =========== 
  */
  @Delete()
  async removeProfile(@Req() { user }, @Res({ passthrough: true }) response: Response) {
    await this.usersService.removeById(+user.id);
    response.cookie('refresh_token', '', { maxAge: 0 });
  }

  /*   
  =========== Обновить учетные данные профиля =========== 
  */
  @Patch('credentials')
  patchCredentials(@Req() { user }, @Body() updateCredentialsDto: UpdateCredentialsDto) {
    return this.usersService.patchCredentials(+user.id, updateCredentialsDto);
  }
  
  /* 
  ===================
  Изменить личные данные профиля по id 
  ===================
  */
  @Patch('personal')
  @UseInterceptors(ClassSerializerInterceptor)
  async patchPersonalData(@Req() { user }, @Body() updatePersonalDto: UpdatePersonalDto) {
    const updatedFields = await this.usersService.patchPersonalData(+user.id, updatePersonalDto);
    return plainToInstance(UpdatePersonalDto, updatedFields);
  }
}
