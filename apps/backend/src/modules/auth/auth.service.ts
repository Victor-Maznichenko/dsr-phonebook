
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions  } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import type { CreateUserDto, User} from '@/modules/users';

import { UsersService } from '@/modules/users';

import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /* 
  ===================
  Логин
  ===================
  */

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    return {
      access_token: this.generateToken(user, { expiresIn: '1h' }),
      refresh_token: this.generateToken(user, { expiresIn: '7d' }),
    };
  }

  /* 
  ===================
  Регистрация
  ===================
  */

  async register(createUserDto: CreateUserDto) {
    // 1. Проверка не существует ли уже
    const candidate = await this.userService.getByEmail(createUserDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 2. Хэшируем пароль
    const hashPassword = await bcrypt.hash(createUserDto.password, 5);

    // 3. Создаем пользователя и возвращаем токен
    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    return {
      access_token: this.generateToken(user, { expiresIn: '1h' }),
      refresh_token: this.generateToken(user, { expiresIn: '7d' }),
    };
  }

  /* 
  ===================
  Проверка учетных данных
  ===================
  */

  private async validateUser(loginDto: LoginDto) {
    // 1. Получаеем User
    const user = await this.userService.getByEmail(loginDto.email);

    // 2. Валидируем
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user?.password ?? '',
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  /* 
  ===================
  Генерация токена
  ===================
  */

  private generateToken(user: User, options?: JwtSignOptions) {
    const { id, email, role } = user;
    return this.jwtService.sign({ id, email, role }, options);
  }


  /* 
  ===================
  Выдача новых токенов
  ===================
  */
  async refreshTokens(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userService.findOne({ where: { id: payload.id } });

    if (!user) throw new Error('User not found');

    return {
      access_token: this.generateToken(user, { expiresIn: '1h' }),
      refresh_token: this.generateToken(user, { expiresIn: '7d' }),
    };
  }
}
