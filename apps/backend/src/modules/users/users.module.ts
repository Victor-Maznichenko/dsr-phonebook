import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AccessRequestsModule } from '../access-requests';
import { AuthModule } from '../auth';
import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule), AccessRequestsModule],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
