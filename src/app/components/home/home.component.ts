import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.getAllBooks();
  }
}
