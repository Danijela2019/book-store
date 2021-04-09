import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  booksWishList: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.booksWishList = this.bookService.getBooksWishlist();
  }
}
