import type {
  CanActivate,
  ExecutionContext} from '@nestjs/common';
import type { Request } from 'express';
import type { User } from 'src/modules/users/models/user.model';

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { IS_PUBLIC_KEY, ROLES_KEY } from './decorators';

type TokenPayload = Pick<User, 'email' | 'id' | 'role'>;

export interface RequestWithUser extends Request {
  user: TokenPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {
    const reflectorTargets = [context.getHandler(), context.getClass()];
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, reflectorTargets);
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, reflectorTargets);

    if (isPublic) return true;

    /* 
    ==================================
    Проверка наличия токена
    ==================================
    */
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const headerAuthorization = request.headers.authorization ?? '';
    const [bearer, token] = headerAuthorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    /* 
    ==================================
    Проверка токена на подлинность
    ==================================
    */
    try {
      const tokenPayload = await this.jwtService.verifyAsync<TokenPayload>(token);
      request.user = { ...tokenPayload };

      if(!requiredRoles) {
        return true;
      }
      
      return requiredRoles.includes(tokenPayload.role)
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
