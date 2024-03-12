import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HireService } from './hire.service';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';

@Controller('hire')
export class HireController {
  constructor(private readonly hireService: HireService) {}

  @Post()
  create(@Body() createHireDto: CreateHireDto) {
    return this.hireService.create(createHireDto);
  }

  @Get()
  findAll() {
    return this.hireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHireDto: UpdateHireDto) {
    return this.hireService.update(+id, updateHireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hireService.remove(+id);
  }
}
