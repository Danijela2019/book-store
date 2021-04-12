import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { BESTSELLERS } from '../data/Bestsellers';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bestsellersArray: Book[];
  constructor() {}

  getAllBooks() {
    return (this.bestsellersArray = BESTSELLERS);
  }
}
