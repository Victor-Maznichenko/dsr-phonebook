import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from 'bcryptjs';
import { Role } from 'src/shared/constants';
import { BaseService } from 'src/shared/utils';

import type { CreateUserDto } from './dto/create-user.dto';

import { UpdatePersonalDto } from './dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
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
    const user = await this.userModel.findByPk(targetUserId);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  async removeById(id: number) {
    return await this.userModel.destroy({ where: { id } });
  }

  async patchCredentials(id: number, updateDto: UpdateCredentialsDto) {
    const user = await this.getById(id);
    
    // Валидации
    if((updateDto.newPassword && !updateDto.oldPassword) || (!updateDto.newPassword && updateDto.oldPassword)) {
      throw new BadRequestException('Для смены пароля необходимо указать старый и новый пароль');
    }

    if(updateDto.email === user.email) {
      throw new BadRequestException('Новый email такой же как старый');
    }

    // Проверка совпадения паролей
    if (updateDto.newPassword && updateDto.oldPassword) {
      const isOldPasswordValid = await bcrypt.compare(updateDto.oldPassword, user.password);

      if (!isOldPasswordValid) {
        throw new UnauthorizedException('Неверный старый пароль');
      }

      user.password = await bcrypt.hash(updateDto.newPassword, 10);
    }

    // Обработка смены email
    if(updateDto.email && updateDto.email !== user.email) {
      const existingUser = await this.getByEmail(updateDto.email);

      if (existingUser) {
        throw new ConflictException('Указанный email уже используется');
      }
      
      user.email = updateDto.email;
    }

    await user.save();
    return "success";
  }

  async patchPersonalData(id: number, updateDto: UpdatePersonalDto) {
    const user = await this.getById(id);

    await user.update(updateDto);

    const updatedFields: Partial<UpdatePersonalDto> = {};

    (Object.keys(updateDto) as (keyof UpdatePersonalDto)[]).forEach((key) => {
      if (updateDto[key] !== undefined) {
        // Берём значение из модели, чтобы вернуть уже сохранённые данные
        // (на случай, если в будущем появится дополнительная логика обработки)
        // @ts-expect-error динамический доступ к полям модели
        updatedFields[key] = user[key];
      }
    });

    return updatedFields;
  }

  // updateById(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
