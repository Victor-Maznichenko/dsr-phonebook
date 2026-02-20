import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/shared/constants';
import { BaseService } from 'src/shared/utils';

import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdatePersonalDto } from './dto/update-personal.dto';

import { User } from './models/user.model';
// import { Roles } from '../auth/decorators';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User) private userModel: typeof User) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({
      ...createUserDto,
      role: Role.DEFAULT,
    });
  }
  
  getAll() {
    throw new Error('Method not implemented.');
  }

  async getById(targetUserId: number, requestingUser: { id: number; role: string }) {
    const user = await this.userModel.findByPk(targetUserId, {
      include: [],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const targetUser = user.get({ plain: true });
    if (requestingUser.role === Role.ADMIN || requestingUser.id === targetUserId) {
      return {...targetUser, hasPersonalAccess: true} as User;
    }

    // const hasAccess = user.hasPersonalAccess
    //   || await this.accessRequestModel.findOne({
    //     where: {
    //       targetUserId,
    //       requesterId: requestingUser.id,
    //       status: 'approved',
    //     },
    //   });

    // if (hasAccess) {
    //   return {...targetUser, hasPersonalAcccess: true};
    // }

    return {
      ...targetUser,
      personalPhones: [],
      hasPersonalAccess: false
    } as User;
  }

  async patchPersonalData(@Req() request, id: number, updatePersonalDto: UpdatePersonalDto) {
    const user = await this.getById(id, request.user);
    user.update(updatePersonalDto);

    return user;
  }

  getByEmail(email: string) {
    return this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  // updateById(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  removeById(id: number) {
    return this.userModel.destroy({ where: { id } });
  }


  /*   
  =========== Получить профиль пользователя =========== 
  */
  /*
  @Get('profile')
  getMe(@Req() req) {
    return this.findOne(req.user.id);
  } 
  */
}
