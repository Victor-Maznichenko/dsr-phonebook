import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AccessRequest } from './access-request.model';
import { AccessRequestsController } from './access-requests.controller';
import { AccessRequestsService } from './access-requests.service';

@Module({
  imports: [SequelizeModule.forFeature([AccessRequest])],
  controllers: [AccessRequestsController],
  providers: [AccessRequestsService],
  exports: [AccessRequestsService],
})
export class AccessRequestsModule {}
