import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter((t) => {
            let encontrou = true;

            if (params.title != undefined && !t.title.includes(params.title)) {
                encontrou = false;
            }
            if (params.status != undefined && !t.status.includes(params.status)) {
                encontrou = false;
            }

            return encontrou;
        });
    }

    create(task: TaskDto) {
        task.id = uuid();
        task.status = TaskStatusEnum.A_FAZER;
        this.tasks.push(task);
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

    findById(id: string): TaskDto {
        const findTask = this.tasks.filter((t) => t.id === id);

        if (findTask.length) {
            return findTask[0];
        }

        throw new HttpException(`task com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
    }

    remove(id: string) {
        const taskIndex = this.tasks.findIndex((t) => t.id === id);

        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1);
            return;
        }

        throw new HttpException(
            `Task com id ${id} não encontrado para excluir`,
            HttpStatus.BAD_REQUEST
        );
    }
}
