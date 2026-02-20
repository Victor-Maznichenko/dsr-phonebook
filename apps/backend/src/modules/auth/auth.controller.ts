import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import type { CreateUserDto, UsersService } from '@/modules/users';

import type { RequestWithUser } from './auth.guard';
import type { AuthService } from './auth.service';
import type { LoginDto } from './dto/login.dto';

import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  /*   
  =========== Логин =========== 
  */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /*   
  =========== Регистрация =========== 
  */
  @Public()
  @Post('register')
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  /*   
  =========== Обновить токены =========== 
  */
  @Public()
  @Get('/refresh')
  async refreshToken(@Req() request, @Res() response) {
    try {
      const refreshToken = request.cookies?.refresh_token;

      if (!refreshToken) throw new UnauthorizedException('Refresh token not found');

      const tokens = await this.authService.refreshTokens(refreshToken);
      response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /*   
  =========== Получить базовые поля текущего пользователя =========== 
  */
  @Get('me')
  async getUserInfo(@Request() request) {
    const user = await this.userService.getById(+request.user.id, request.user);

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
}
