import { Injectable } from '@nestjs/common';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';

@Injectable()
export class HireService {
  create(createHireDto: CreateHireDto) {
    return 'This action adds a new hire';
  }

  findAll() {
    return `This action returns all hire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hire`;
  }

  update(id: number, updateHireDto: UpdateHireDto) {
    return `This action updates a #${id} hire`;
  }

  remove(id: number) {
    return `This action removes a #${id} hire`;
  }
}
