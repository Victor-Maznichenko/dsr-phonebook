import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File) {
    const dir = path.resolve(__dirname, '..', 'static');

    try {
      await fs.mkdir(dir, { recursive: true });
      const extension = this.getExtension(file.mimetype);
      const fileName = `${uuid.v4()}.${extension}`;
      const filePath = path.join(dir, fileName);
      this.saveFileToPath(file, filePath)

      return fileName;
    } catch {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const safeName = path.basename(fileName);
      const filePath = path.resolve(__dirname, '..', 'static', safeName);
      await fs.unlink(filePath);
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        throw new HttpException(
          'Произошла ошибка при удалении файла',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.error('Файл не найден');
    }
  }

  private async saveFileToPath(file: Express.Multer.File, targetPath: string) {
  // Если Multer вернул буфер (in-memory)
  if (file.buffer && file.buffer.length > 0) {
    await fs.writeFile(targetPath, file.buffer);
    return;
  }

  // Если Multer сохранил файл во временном пути
  if (file?.path) {
    await fs.copyFile(file.path, targetPath);
    return;
  }

  throw new HttpException('Нет данных файла для сохранения', HttpStatus.BAD_REQUEST);
}

  private getExtension(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };

    const ext = map[mimeType];

    if (!ext) {
      throw new HttpException(
        'Неподдерживаемый тип файла',
        HttpStatus.BAD_REQUEST,
      );
    }

    return ext;
  }
}
