import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/message.heper";
import { RegexHelper } from "src/helpers/regex.helper";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(RegexHelper.password, {message: MessageHelper.passwordValid,})
    password: string;
}