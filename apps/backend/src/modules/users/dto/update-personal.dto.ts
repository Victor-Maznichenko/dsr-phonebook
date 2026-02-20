import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

export class UpdatePersonalDto extends PartialType(OmitType(CreateUserDto, ['email', 'password', 'birthday'])) {}
