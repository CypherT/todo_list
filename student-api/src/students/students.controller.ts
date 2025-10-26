<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@ApiTags('students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
=======
import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
>>>>>>> eb58b832d3fc5c1d01a380dd3875c0aa0ad01e0b
@Controller('students')
export class StudentsController {
  constructor(private readonly svc: StudentsService) {}

  @Post()
<<<<<<< HEAD
  @ApiBody({ type: CreateStudentDto })
=======
>>>>>>> eb58b832d3fc5c1d01a380dd3875c0aa0ad01e0b
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() dto: CreateStudentDto) {
    return this.svc.create(dto);
  }

<<<<<<< HEAD

=======
>>>>>>> eb58b832d3fc5c1d01a380dd3875c0aa0ad01e0b
  @Get()
  @ApiQuery({ name: 'q', required: false, description: 'Search by name/code/class' })
  findAll(@Query('q') q?: string) {
    return this.svc.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(+id);
  }

  @Put(':id')
<<<<<<< HEAD
  @ApiBody({ type: UpdateStudentDto })
=======
>>>>>>> eb58b832d3fc5c1d01a380dd3875c0aa0ad01e0b
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.svc.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(+id);
  }
}