import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bestsellersArray: Book[];
  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<Book[]>('https://bookstore-65f65-default-rtdb.firebaseio.com/bestsellers.json').pipe(
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
}
