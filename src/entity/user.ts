import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @IsNotEmpty()
    @Length(10, 80)
    name: string;

    @Column({
        length: 100
    })
    @Length(10, 100)
    @IsEmail()
    @IsNotEmpty()
    email: string;
}