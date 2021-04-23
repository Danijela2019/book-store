import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css'],
})
export class WishListItemComponent implements OnInit {
  @Input() wishlistItem: Book;
  @Output() deleteBook: EventEmitter<Book> = new EventEmitter();

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {}

  onRemoveBook(item: Book) {
    this.deleteBook.emit(item);
    this.wishlistService.onRemovedFromFavorites.emit(1);
  }
}
