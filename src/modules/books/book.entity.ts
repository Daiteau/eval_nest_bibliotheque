import { AfterInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Borrow } from '../borrows/borrow.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  auteur: string;

  @Column()
  genre: string;

  @Column()
  rating: number;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows?: Borrow[];

  @AfterInsert()
  logInsert() {
    console.log('User created with id ' + this.id);
  }
}