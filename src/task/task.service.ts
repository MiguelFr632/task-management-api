import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: TaskDto) {
        this.tasks.push(task);
        console.log(this.tasks);
    }

    findById(id: string): TaskDto {
        const findTask = this.tasks.filter((t) => t.id === id);

        if (findTask.length) {
            return findTask[0];
        }

        throw new HttpException(`task com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    update(task: TaskDto) {
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task;
            return;
        }

        throw new HttpException(
            `Task com id ${task.id} não encontrado para atualizar`,
            HttpStatus.NOT_FOUND
        );
    }
}
