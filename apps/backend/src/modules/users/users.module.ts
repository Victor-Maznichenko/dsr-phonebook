import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProfileController } from './controllers/profile.controller';
// import { AuthModule } from '../auth';
import { UsersController } from './controllers/users.controller';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
