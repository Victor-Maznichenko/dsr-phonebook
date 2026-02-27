import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() declare id: number;
  @Expose() declare email: string;
  @Expose() declare firstName: string;
  @Expose() declare lastName: string;
  @Expose() declare workPhone: string;
  @Expose() declare department: string;
  @Expose() declare grade: string;
  @Expose() declare birthday: string;
  @Expose() declare avatar: string;
  @Expose() declare about: string;
  @Expose() declare personalPhones: string[];
  @Expose() declare hasPersonalAccess: boolean;
}

