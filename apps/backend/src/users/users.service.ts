import { Get, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      ...createUserDto,
      role: 'default',
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number, fields?: string[]) {
    return this.userRepository.findByPk(id, {
      attributes: fields,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  /*   
  =========== Получить базовые поля текущего пользователя =========== 
  */
 
  getMe() {
    return this.findOne(req.user.id, ['id', 'firstName', 'lastName', 'role', 'avatar']);
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
