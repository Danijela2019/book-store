import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  booksWishList: Book[] = [];
  isLoading: boolean = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.wishlistService.fetchWishLit().subscribe((res) => {
      this.isLoading = false;
      this.booksWishList = res;
    });
  }

  removeBookFromArray(book: Book) {
    /*this.booksWishList = this.booksWishList.filter(
      (item) => item.isbn13 !== book.isbn13
    );
    this.wishlistService.removeBooksFromWishList(book);*/
  }
}
