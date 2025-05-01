import {
    IsDateString,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
    A_FAZER = 'A fazer',
    EM_ANDAMENTO = 'Em andamento',
    FEITO = 'Feito',
}

export class TaskDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;

    @IsString()
    @MinLength(5)
    @MaxLength(512)
    description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export interface FindAllParameters {
    title: string;
    status: string;
}
