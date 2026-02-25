import { Expose } from 'class-transformer';

export class UserDetailDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() workPhone: string;
  @Expose() department: string;
  @Expose() grade: string;
  @Expose() birthday: string;
  @Expose() avatar: string;
  @Expose() about: string;
  @Expose() personalPhones: string[];
  @Expose() hasPersonalAccess: boolean;
}
