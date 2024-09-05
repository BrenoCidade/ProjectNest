import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async index() {
        return await this.userService.findAll();
    }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        return await this.userService.createUser(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findById(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.destroy(id);
    }
}
