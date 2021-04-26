import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  booksArrayUpdated = new Subject<Book[]>();
  //booksArray: Book[];
  onAddedToFavorites = new Subject<any>();
  onRemovedFromFavorites = new Subject<any>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchWishList() {
    this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.get<Book[]>('https://bookstore-65f65-default-rtdb.firebaseio.com/wishlist.json', {
            params: new HttpParams().set('auth', user.getToken()),
          });
        }),
        map((responseData) => {
          const booksArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              booksArray.push({ ...responseData[key], id: key });
            }
          }
          return booksArray;
        })
      )
      .subscribe((res) => this.booksArrayUpdated.next(res));
  }

  addBooksToWishList(book: Book) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post<{ name: string }>(
          'https://bookstore-65f65-default-rtdb.firebaseio.com/wishlist.json',
          book,
          {
            params: new HttpParams().set('auth', user.getToken()),
          }
        );
      })
    );
  }

  removeBooksFromWishList(book: Book) {
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.delete<Book>(
            `https://bookstore-65f65-default-rtdb.firebaseio.com/wishlist/${book.id}.json`,
            {
              params: new HttpParams().set('auth', user.getToken()),
            }
          );
        })
      )
      .subscribe();
  }
}
