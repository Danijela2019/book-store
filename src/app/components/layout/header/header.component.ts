import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private wishListService: WishlistService) {}

  ngOnInit(): void {}

  getWishListLength() {
    return this.wishListService.getBooksWishlist().length.toString();
  }
}
