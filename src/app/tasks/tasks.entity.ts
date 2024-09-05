import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "../users/users.entity";


@Entity({name: 'tasks'})
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    taskId: string;

    @Column({name: 'tasks_title'})
    title: string;

    @Column({name: 'tasks_description'})
    description: string;

    @CreateDateColumn({name: 'task_created_at'})
    createdAt: string;

    @CreateDateColumn({name: 'task_updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'task_deleted_at'})
    deletedAt: string;

    @ManyToOne(() => UsersEntity, (user) => user.tasks)
    user: UsersEntity;
}