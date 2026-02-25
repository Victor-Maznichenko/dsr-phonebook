import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth';
import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
