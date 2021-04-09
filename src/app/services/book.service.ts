import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksWishlist: Book[] = [];
  booksWishlistUpdated = new Subject<Book[]>();
  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<Book[]>(
      'https://bookstore-383c3-default-rtdb.firebaseio.com/books.json'
    );
  }

  getBooksWishlist() {
    return this.booksWishlist.slice();
  }

  addBooksToWishList(book: Book) {
    this.booksWishlist.push(book);
    this.booksWishlistUpdated.next(this.booksWishlist.slice());
  }
}
