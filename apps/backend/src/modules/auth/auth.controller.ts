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

import { CreateUserDto, UsersService } from '@/modules/users';

import type { LoginDto } from './dto';

import { AuthService } from './auth.service';
import { Public } from './decorators';

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
  async adminLogin(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(loginDto, true);
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return tokens.access_token;
  }

  /*   
  =========== Логин =========== 
  */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(loginDto);
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return tokens.access_token;
  }

  /*   
  =========== Регистрация =========== 
  */
  @Public()
  @Post('register')
  async register(@Body() registerDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.register(registerDto);
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return tokens.access_token;
  }

  /*   
  =========== Обновить токены =========== 
  */
  @Public()
  @Post('refresh')
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
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('refresh_token', '', { maxAge: 0 });
  }
}
