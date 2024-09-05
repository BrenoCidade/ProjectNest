import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './tasks.entity';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { UpdateTasksDto } from './dtos/update-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
) {}

async findAllTasks() {
    return await this.taskRepository.find({
        select: ['taskId', 'title', 'description']
    });
}

async findTaskById(taskId: string): Promise<TaskEntity> {
    try {
        return await this.taskRepository.findOneOrFail({where: {taskId}});
    } catch (error) {
        throw new NotFoundException(error.message);
    }
}

async createTask(data: CreateTasksDto) {
    const user = await this.taskRepository.create(data);
    return await this.taskRepository.save(user);
}

async updateTask(taskId: string, data: UpdateTasksDto) {
    const task = await this.findTaskById(taskId);
    this.taskRepository.merge(task, data);
    return await this.taskRepository.save(task);
}

async destroyTask(taskId: string) {
    await this.taskRepository.delete({taskId});
}
}
