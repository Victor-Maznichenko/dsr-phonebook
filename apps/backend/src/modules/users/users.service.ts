import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/shared/constants';
import { BaseService } from 'src/shared/utils';

import type { CreateUserDto } from './dto/create-user.dto';

import { User } from './models/user.model';

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
  
  async getAll() {
    return await this.userModel.findAll();
  }

  async getById(targetUserId: number) {
    return await this.userModel.findByPk(targetUserId);
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  async removeById(id: number) {
    return await this.userModel.destroy({ where: { id } });
  }

  // async patchPersonalData(@Req() request, id: number, updatePersonalDto: UpdatePersonalDto) {
  //   const user = await this.getById(id, request.user);
  //   user.update(updatePersonalDto);

  //   return user;
  // }

  // updateById(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
