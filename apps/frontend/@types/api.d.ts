interface LoginDto {
  password: string;
  email: string;
}

interface RegisterDto extends Pick<Required<UserDto>, | 'department'
  | 'email'
  | 'firstName'
  | 'grade'
  | 'lastName'
  | 'workPhone'> {
  password: string;
  about?: string;
}

interface UserMe extends Pick<Required<UserDto>, 'avatar' | 'email' | 'firstName' | 'id' | 'lastName' | 'role'> { }

interface UserDto {
  hasPersonalAccess: boolean;
  avatar?: Nullable<string>;
  personalPhones?: string[];
  officeAddress: string;
  department: string;
  firstName: string;
  workPhone: string;
  lastName: string;
  birthday: string;
  about?: string;
  email: string;
  grade: string;
  role: string;
  id: number;
}

interface UserCompactDto extends Pick<UserDto, 'avatar' | 'birthday' | 'department' | 'email' | 'firstName' | 'grade' | 'id' | 'lastName' | 'workPhone'> {}

interface UserDetailDto extends Omit<UserDto, 'hasPersonalAccess' | 'role'> { }

interface PatchUserPersonal extends Omit<Partial<UserDetailDto>, 'avatar' | 'birthday' | 'email' | 'id' | 'role'> {}

interface PatchUserPasswords {
  oldPassword: string;
  newPassword: string;
}

interface AccessRequestUser {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  id: number;
}

interface AccessRequestDto {
  status: 'approved' | 'pending' | 'rejected';
  grantee: AccessRequestUser;
  target: AccessRequestUser;
  granteeUserId: number;
  targetUserId: number;
  createdAt: string;
  id: number;
}

interface AccessRequestsResponse {
  rows: AccessRequestDto[];
  count: number;
}
