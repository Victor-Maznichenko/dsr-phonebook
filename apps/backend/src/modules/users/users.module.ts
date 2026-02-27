import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AccessRequestsModule } from '@/modules/access-requests';
import { AuthModule } from '@/modules/auth';
import { FilesModule } from '@/modules/files';

import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule), AccessRequestsModule, FilesModule],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
