import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hashSync} from 'bcrypt';


@Entity({name: 'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column()
    email:string;

    @Column()
    password: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @CreateDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }
}