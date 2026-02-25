import { Expose } from 'class-transformer';

export class UserCompactDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() workPhone: string;
  @Expose() department: string;
  @Expose() grade: string;
  @Expose() birthday: string;
  @Expose() avatar: string;
}
