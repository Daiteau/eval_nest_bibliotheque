import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Borrow } from '../borrows/borrow.entity';
import { CreateBorrowDto } from '../borrows/dtos/borrow.dto'


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(User) private borrowRepo: Repository<Borrow>,
) {}

  async create(email: string, password: string) {
    const user = this.userRepo.create({
      email: email,
      password: password,
    });
    this.userRepo.save(user);
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found')
    }

    Object.assign(user, attr)
    return this.userRepo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found')
    }

    await this.userRepo.remove(user)
    return `User ${id} removed`
  }

  async findOne(id: number) {
    const user = this.userRepo.findOneBy({ id })
    return user
  }

  async findAll(){
    const users = this.userRepo.find({take:100})
    return users
  }

  async findOneByEmail(email: string){
    const user = this.userRepo.findOneBy({ email })
    return user
  }

  async borrowBook(user_id: number, book_id: number){
    const borrow: CreateBorrowDto = {
        user_id: user_id,
        book_id: book_id,
        borrowed_at: new Date(),
        returned_at: null,
    }
    return this.borrowRepo.create(borrow)
  }

  async giveBackBook(user_id: number, book_id: number){
    const borrow = await this.borrowRepo.findOneBy({ user_id: user_id, book_id: book_id, returned_at: null })
    borrow.returned_at = new Date();
    return this.borrowRepo.save(borrow);
  }
}
