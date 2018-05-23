import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    name: string;

    @Column({
        length: 100
    })
    email: string;
}