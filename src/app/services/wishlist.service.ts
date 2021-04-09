import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private booksWishlist: Book[] = [];
  booksWishlistUpdated = new Subject<Book[]>();
  constructor(private http: HttpClient) {}

  getBooksWishlist() {
    return this.booksWishlist.slice();
  }

  addBooksToWishList(book: Book) {
    this.booksWishlist.push(book);
    this.booksWishlistUpdated.next(this.booksWishlist.slice());
    this.http
      .put<Book>(
        "'https://bookstore-383c3-default-rtdb.firebaseio.com/books.json",
        book
      )
      .subscribe((res) => console.log('response data', res));
  }
  removeBooksFromWishList(book: Book) {
    console.log('The book we need to remove', book);
  }
}
