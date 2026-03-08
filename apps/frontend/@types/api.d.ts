interface LoginDto {
  password: string;
  email: string;
}

interface RegisterDto extends Pick<Required<UserDto>, | 'about'
  | 'department'
  | 'email'
  | 'firstName'
  | 'grade'
  | 'lastName'
  | 'officePhone'
  | 'position'
  | 'workPhone'> {
  password: string;
}

interface UserDto {
  hasPersonalAccess: boolean;
  avatar?: Nullable<string>;
  personalPhones?: string[];
  officeAddress: string;
  position?: Position;
  officePhone: string;
  department: string;
  firstName: string;
  workPhone: string;
  lastName: string;
  birthday: string;
  about?: string;
  email: string;
  grade: string;
  id: number;
}

interface UserCompactDto extends Pick<UserDto, 'avatar' | 'birthday' | 'department' | 'email' | 'firstName' | 'grade' | 'id' | 'lastName' | 'workPhone'> {}

interface UserDetailDto extends Omit<UserDto, 'hasPersonalAccess'> { }
