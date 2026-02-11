import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify([
      { id: 0, name: 'Victor' },
      { id: 1, name: 'Sanya' },
    ]);
  }
}
