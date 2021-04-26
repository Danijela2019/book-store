import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private wishListSubscription: Subscription;
  private bookAddedSubscription: Subscription;
  private bookRemovedSubscription: Subscription;
  isAuthenticated = false;
  isActive = true;
  wishlistArray: Book[] = [];

  constructor(private authService: AuthService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
    this.wishlistService.fetchWishList();
    this.wishListSubscription = this.wishlistService.booksArrayUpdated.subscribe((books) => {
      this.wishlistArray = books;
    });
    this.bookAddedSubscription = this.wishlistService.onAddedToFavorites.subscribe((_res) => {
      this.wishlistArray.push(_res);
    });
    this.bookRemovedSubscription = this.wishlistService.onRemovedFromFavorites.subscribe((_res) => {
      this.wishlistArray.pop();
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onMenuClick() {
    this.isActive = !this.isActive;
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.wishListSubscription.unsubscribe();
    this.bookAddedSubscription.unsubscribe();
    this.bookRemovedSubscription.unsubscribe();
  }
}
