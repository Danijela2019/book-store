import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';
import { Book } from '../models/Book';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private booksWishlist: Book[] = [];

  constructor(private http: HttpClient) {}

  getBooksWishlist() {
    return this.booksWishlist.slice();
  }

  fetchWishLit() {
    return this.http
      .get<Book[]>(
        'https://bookstore-65f65-default-rtdb.firebaseio.com/wishlist.json'
      )
      .pipe(
        map((responseData) => {
          const booksArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              booksArray.push({ ...responseData[key], id: key });
            }
          }
          return booksArray;
        })
      );
  }

  addBooksToWishList(book: Book) {
    return this.http.post<{ name: string }>(
      'https://bookstore-65f65-default-rtdb.firebaseio.com/wishlist.json',
      book
    );
  }
}
