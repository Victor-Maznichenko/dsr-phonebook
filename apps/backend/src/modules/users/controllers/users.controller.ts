import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  SerializeOptions,
} from '@nestjs/common';

import { Roles } from '@/modules/auth/decorators';
import { Role } from '@/shared/constants';

import type { UpdatePersonalDto } from '../dto/update-personal.dto';
import type { UsersService } from '../users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SerializeOptions({ groups: ['compact'] })
  getAll() {
    return this.usersService.getAll();
  }

  // TODO: Достать request и сделать isAdmin flag
  @Get(':id')
  async getById(@Param('id') id: string, @Req() { user }) {
    const requestingUser = { id: user.id, role: user.role };
    const result = await this.usersService.getById(+id, requestingUser);

    return result;
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

  // @Get('me')
  // getMe() {
  //   return this.usersService.getMe();
  // }
}
