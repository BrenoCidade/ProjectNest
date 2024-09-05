import {IsNotEmpty} from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    firtName: string;

    @IsNotEmpty()
    lastName: string;
}