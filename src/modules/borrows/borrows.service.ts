import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';

@Injectable()
export class BorrowsService {
  constructor(@InjectRepository(Borrow) private repo: Repository<Borrow>) {}

  async create(borrow:Borrow) {
    const newBorrow = this.repo.create(borrow);
    await this.repo.save(newBorrow);
  }

  async update(id: number, attr: Partial<Borrow>) {
    const borrow = await this.findOne(id);
    if (!borrow) {
      throw new Error('Borrow not found')
    }

    Object.assign(borrow, attr)
    return await this.repo.save(borrow)
  }

  async remove(id: number) {
    const borrow = await this.findOne(id);
    if (!borrow) {
      throw new Error('Borrow not found')
    }

    await this.repo.remove(borrow)
    return `Borrow ${id} removed`
  }

  async findOne(id: number) {
    const borrow = await this.repo.findOneBy({ id })
    return borrow
  }

  async findAll(){
    const borrows = await this.repo.find({take:100})
    return borrows
  }
}
