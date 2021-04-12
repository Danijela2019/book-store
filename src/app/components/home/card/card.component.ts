import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() book: Book;
  addedToFavorites: boolean = false;
  text: string;
  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {}

  onHeartClicked(clickedBook: Book) {
    this.wishlistService
      .addBooksToWishList(clickedBook)
      .subscribe((_res) => (this.text = 'Successfully added'));
    this.addedToFavorites = true;
  }
}
