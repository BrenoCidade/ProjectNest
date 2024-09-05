import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTasksDto } from './dtos/update-tasks.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateTasksDto } from './dtos/create-tasks.dto';

@Controller('api/v1/tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {

  constructor(private readonly tasksServices: TasksService) {}

    @Get()
    async index() {
        return await this.tasksServices.findAllTasks();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.tasksServices.findTaskById(id);
    }

    @Post()
    async createUser(@Body() body: CreateTasksDto) {
        return await this.tasksServices.createTask(body);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) taskId: string, @Body() body: UpdateTasksDto) {
        return await this.tasksServices.updateTask(taskId, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) taskId: string) {
        await this.tasksServices.destroyTask(taskId);
    }
}
