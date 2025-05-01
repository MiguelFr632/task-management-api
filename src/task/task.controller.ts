import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.taskService.findAll(params);
    }

    @Post()
    create(@Body() task: TaskDto) {
        this.taskService.create(task);
    }

    @Put()
    update(@Body() task: TaskDto) {
        this.taskService.update(task);
    }

    @Get('/:id')
    findById(@Param('id') id: string): TaskDto {
        return this.taskService.findById(id);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}
