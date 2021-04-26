import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnDestroy {
  booksWishistSubscription: Subscription;
  booksWishList: Book[] = [];
  isLoading: boolean = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.wishlistService.fetchWishList();
    this.booksWishistSubscription = this.wishlistService.booksArrayUpdated.subscribe((books) => {
      this.isLoading = false;
      this.booksWishList = books;
    });
  }

  removeBookFromArray(book: Book) {
    this.booksWishList = this.booksWishList.filter((item) => item.id !== book.id);
    this.wishlistService.removeBooksFromWishList(book);
    this.wishlistService.onRemovedFromFavorites.next(book);
  }

  ngOnDestroy() {
    this.booksWishistSubscription.unsubscribe();
  }
}
