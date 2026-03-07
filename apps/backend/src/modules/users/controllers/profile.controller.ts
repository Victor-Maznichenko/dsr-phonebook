import type { Response } from 'express';

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { FilesService } from '@/modules/files/files.service';

import { AvatarResponseDto, UpdateCredentialsDto, UpdatePersonalDto, UserDetailDto } from '../dto';
import { UsersService } from '../users.service';

@ApiTags('Профиль')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
  ) { }

  /*
  =========== Получить профиль =========== 
  */
  @Get()
  @ApiOperation({ operationId: 'getProfile', summary: 'Получить профиль текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Профиль пользователя успешно получен', type: UserDetailDto })
  async getProfile(@Req() { user }) {
    const targetUser = await this.usersService.getById(+user.id);
    return plainToInstance(UserDetailDto, targetUser, { excludeExtraneousValues: true });
  }

  /*   
  =========== Удлалить профиль =========== 
  */
  @HttpCode(204)
  @Delete()
  @ApiOperation({ operationId: 'deleteProfile', summary: 'Удалить профиль текущего пользователя' })
  @ApiResponse({ status: 204, description: 'Профиль пользователя успешно удалён' })
  async removeProfile(@Req() { user }, @Res({ passthrough: true }) response: Response) {
    await this.usersService.removeById(+user.id);
    response.cookie('refresh_token', '', { maxAge: 0 });
  }

  /*   
  =========== Обновить учетные данные профиля =========== 
  */
  @Patch('credentials')
  @ApiOperation({ operationId: 'patchProfileCredentitals', summary: 'Обновить учетные данные текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Учетные данные успешно обновлены' })
  patchCredentials(@Req() { user }, @Body() dto: UpdateCredentialsDto) {
    return this.usersService.patchCredentials(+user.id, dto);
  }

  /* 
  ===================
  Изменить личные данные профиля по id 
  ===================
  */
  @Patch('personal')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ operationId: 'patchProfilePersonal', summary: 'Обновить личные данные текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Личные данные успешно обновлены', type: UpdatePersonalDto })
  async patchPersonalData(@Req() { user }, @Body() dto: UpdatePersonalDto) {
    const updatedFields = await this.usersService.patchPersonalData(+user.id, dto);
    return plainToInstance(UpdatePersonalDto, updatedFields);
  }

  /*   
  =========== Обновить аватар профиля =========== 
  */
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ operationId: 'patchProfileAvatar', summary: 'Обновить аватар текущего пользователя' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Аватар успешно обновлён', type: AvatarResponseDto })
  async updateAvatar(
    @Req() { user },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif)(;.*)?$/i }),
        ],
      }),
    ) file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл аватара не передан');
    }

    const fileName = await this.filesService.createFile(file);

    const oldAvatar = await this.usersService.getAvatarUrl(user.id);
    if (oldAvatar) {
      await this.filesService.deleteFile(oldAvatar);
    }

    const updatedUser = await this.usersService.updateAvatar(+user.id, fileName);

    return plainToInstance(AvatarResponseDto, updatedUser, { excludeExtraneousValues: true });
  }
}
