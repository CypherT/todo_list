import { Controller, Get, Post, Body, Param, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@ApiTags('students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly svc: StudentsService) {}

  @Post()
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() dto: CreateStudentDto) {
    return this.svc.create(dto);
  }


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
  @ApiBody({ type: UpdateStudentDto })
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.svc.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(+id);
  }
}