import {IsNotEmpty} from "class-validator";

export class UpdateTasksDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}