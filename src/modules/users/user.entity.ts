import { AfterInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Borrow } from '../borrows/borrow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;


  @ManyToOne(() => Borrow, (borrow) => borrow.users, {
    cascade: true,
    onDelete: "CASCADE",
  })
  borrows: Borrow;

  @AfterInsert()
  logInsert() {
    console.log('User created with id ' + this.id);
  }
}