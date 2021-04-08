import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<Book[]>(
      'https://bookstore-383c3-default-rtdb.firebaseio.com/books.json'
    );
  }
}
