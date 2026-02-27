import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from 'bcryptjs';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize/lib/sequelize';
import { Role } from 'src/shared/constants';
import { BaseService } from 'src/shared/utils';

import { CreateUserDto, UpdateCredentialsDto, UpdatePersonalDto, UsersFiltersDto } from './dto';
import { User } from './user.model';

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

  async getAll({ limit, offset, search }: UsersFiltersDto) {
    const where: WhereOptions<User> = {};

    if (search) {
      where[Op.or] = [
        // Поиск по строке "Имя Фамилия"
        sequelize.where(
          sequelize.fn('concat_ws', ' ',
            sequelize.col('firstName'),
            sequelize.col('lastName'),
          ),
          { [Op.iLike]: `%${search}%` }
        ),
        // Поиск по строке "Фамилия Имя"
        sequelize.where(
          sequelize.fn('concat_ws', ' ',
            sequelize.col('lastName'),
            sequelize.col('firstName'),
          ),
          { [Op.iLike]: `%${search}%` }
        )
      ];
    }

    return await this.userModel.findAll({ limit, offset, where });
  }

  async getById(targetUserId: number, includeRequests = false) {
    const requestsOption: Omit<FindOptions<User>, "where"> = {};

    if(includeRequests) {
      requestsOption.include = [
        { association: 'outgoingRequests', include: [{ association: 'target' }] },
        { association: 'incomingRequests', include: [{ association: 'grantee' }] },
      ]
    }

    const user = await this.userModel.findByPk(targetUserId, requestsOption);

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
    if ((updateDto.newPassword && !updateDto.oldPassword) || (!updateDto.newPassword && updateDto.oldPassword)) {
      throw new BadRequestException('Для смены пароля необходимо указать старый и новый пароль');
    }

    if (updateDto.email === user.email) {
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
    if (updateDto.email && updateDto.email !== user.email) {
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

    // Жёстко ограничиваем, какие поля можно трогать через personal
    const allowedKeys: (keyof UpdatePersonalDto)[] = [
      'firstName',
      'lastName',
      'workPhone',
      'personalPhones',
      'department',
      'grade',
      'officeAddress',
      'birthday',
      'about',
      'hasPersonalAccess',
    ];

    const dataToUpdate: Partial<User> = {};

    for (const key of allowedKeys) {
      const value = (updateDto as any)[key];
      if (value !== undefined) {
        (dataToUpdate as any)[key] = value;
      }
    }

    await user.update(dataToUpdate);

    const updatedFields = {} as Partial<UpdatePersonalDto>;

    for (const key of allowedKeys) {
      if ((updateDto as any)[key] !== undefined) {
        (updatedFields as any)[key] = (user as any)[key];
      }
    }

    return updatedFields;
  }

  // updateById(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
