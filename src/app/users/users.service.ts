import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, Not, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) {}

    async findAll() {
        return await this.userRepository.find({
            select: ['id', 'firstName', 'lastName', 'email']
        });
    }

    async findByEmail(email: string): Promise<UsersEntity> {
        try {
            return await this.userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findById(id: string): Promise<UsersEntity> {
        try {
            return await this.userRepository.findOneOrFail({where: {id}});
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async createUser(data: CreateUserDto) {
        const user = await this.userRepository.create(data);
        return await this.userRepository.save(user);
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findById(id);
        this.userRepository.merge(user, data);
        return await this.userRepository.save(user);
    }

    async destroy(id: string) {
        await this.userRepository.delete({id});
    }
}
