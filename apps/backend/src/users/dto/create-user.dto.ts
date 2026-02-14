export class CreateUserDto {
  declare readonly email: string;
  declare readonly password: string;
  declare readonly firstName: string;
  declare readonly lastName: string;
  declare readonly personalPhones: string[];
  declare readonly department: string;
  declare readonly grade: string;
  declare readonly officeAddress: string;
}
