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

import { UpdateCredentialsDto } from '../dto/update-credentials.dto';
import { UserDetailDto } from '../dto/user-detail-dto';
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
  @Patch('credentitals')
  patchCredentitals(@Req() { user }, @Body() updateCredentialsDto: UpdateCredentialsDto) {
    return this.usersService.patchCredentials(+user.id, updateCredentialsDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.(+id, updateUserDto);
  // }
}
