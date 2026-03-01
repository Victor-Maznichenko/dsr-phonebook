import type { Response } from 'express';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UsersService } from '@/modules/users';

import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginDto } from './dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  /*   
  =========== Логин администратора =========== 
  */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('admin/login')
  @ApiOperation({ summary: 'Логин администратора' })
  @ApiResponse({ status: 200, description: 'Администратор успешно авторизован' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные администратора' })
  async adminLogin(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(dto, true);
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return tokens.access_token;
  }

  /*   
  =========== Логин =========== 
  */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно авторизован' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(dto);
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return tokens.access_token;
  }

  /*   
  =========== Регистрация =========== 
  */
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 400, description: 'Некорректные данные для регистрации' })
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.register(dto);
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return tokens.access_token;
  }

  /*   
  =========== Обновить токены =========== 
  */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Обновить пару токенов по refresh-токену' })
  @ApiResponse({ status: 200, description: 'Токены успешно обновлены' })
  @ApiResponse({ status: 401, description: 'Неверный или отсутствующий refresh-токен' })
  async refreshToken(@Req() request: RequestWithUser, @Res({ passthrough: true }) response: Response) {
    try {
      const refreshToken = request.cookies?.refresh_token;

      if (!refreshToken) throw new UnauthorizedException('Refresh token not found');

      const tokens = await this.authService.refreshTokens(refreshToken);
      response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, maxAge: 7 * 24 * 3600000 });
      return tokens.access_token;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /*   
  =========== Получить базовые поля текущего пользователя =========== 
  */
  @Get('me')
  @ApiOperation({ summary: 'Получить базовую информацию о текущем пользователе' })
  @ApiResponse({ status: 200, description: 'Информация о пользователе успешно получена' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async getUserInfo(@Req() request: RequestWithUser) {
    const user = await this.userService.getById(+request.user.id);

    if (!user) {
      throw new NotFoundException();
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
    };
  }

  /*   
  =========== Выход из аккаунта =========== 
  */
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiResponse({ status: 200, description: 'Сессия завершена' })
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('refresh_token', '', { maxAge: 0 });
  }
}
