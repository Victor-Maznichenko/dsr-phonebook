import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessRequestService } from './access-request.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';

@Controller('access-request')
export class AccessRequestController {
  constructor(private readonly accessRequestService: AccessRequestService) {}

  @Post()
  create(@Body() createAccessRequestDto: CreateAccessRequestDto) {
    return this.accessRequestService.create(createAccessRequestDto);
  }

  @Get()
  findAll() {
    return this.accessRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessRequestDto: UpdateAccessRequestDto) {
    return this.accessRequestService.update(+id, updateAccessRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessRequestService.remove(+id);
  }
}
