// src/todos/todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity'; // Import sẽ ok vì export rồi

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll(); // Bây giờ nhận ra method
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(+id);
  }

  @Post()
  create(@Body() createTodoDto: Partial<Todo>): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Partial<Todo>,
  ): Promise<Todo> {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(+id);
  }
}
