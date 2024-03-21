import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HireService } from './hire.service';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@Controller('hire')
export class HireController {
  constructor(private readonly hireService: HireService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createHireDto: CreateHireDto,
  ) {
    return this.hireService.create(req, res, createHireDto);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.hireService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.hireService.findOne(res, id);
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
