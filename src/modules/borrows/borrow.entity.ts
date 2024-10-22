import { AfterInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  book_id: number;

  @Column()
  borrowed_at: Date;

  @Column()
  returned_at: Date | null;
  
  @ManyToOne(() => Book, (book) => book.borrows, {
    cascade: true,
    onDelete: "CASCADE",
  })
  book: Book;

  @OneToMany(() => User, (user) => user.borrows)
  users?: User[];

  @AfterInsert()
  logInsert() {
    console.log('User created with id ' + this.id);
  }
}