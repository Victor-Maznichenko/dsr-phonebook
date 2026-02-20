import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
} from '@nestjs/common';

import type { UsersService } from '../users.service';

@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getById(@Request() { user }) {
    const requestingUser = { id: user.id, role: user.role };
    const result = await this.usersService.getById(+user.id, requestingUser);

    return result;
  }

//   @Patch('profile/personal')
//   patchPersonalData(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
//     return this.usersService.patchPersonalData(+id, updatePersonalDto);
//   }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.(+id, updateUserDto);
  // }

  @Delete('/profile')
  remove(@Param('id') id: string) {
    return this.usersService.removeById(+id);
  }

  // @Get('me')
  // getMe() {
  //   return this.usersService.getMe();
  // }
}
