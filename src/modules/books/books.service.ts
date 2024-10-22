import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  async create(book:Book) {
    const newBook = this.repo.create(book);
    await this.repo.save(newBook);
  }

  async update(id: number, attr: Partial<Book>) {
    const book = await this.findOne(id);
    if (!book) {
      throw new Error('Book not found')
    }

    Object.assign(book, attr)
    return await this.repo.save(book)
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new Error('Book not found')
    }

    await this.repo.remove(book)
    return `Book ${id} removed`
  }

  async findOne(id: number) {
    const book = await this.repo.findOneBy({ id })
    return book
  }

  async findAll(){
    const books = await this.repo.find({take:100})
    return books
  }
}
