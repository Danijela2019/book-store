import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() book: Book;
  addedToFavorites: boolean = false;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  onHeartClicked(clickedBook: Book) {
    console.log('I was clicked');
    console.log('Clicked book', clickedBook);
    this.bookService.addBooksToWishList(clickedBook);
    this.addedToFavorites = true;
  }
}
