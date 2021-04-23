import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated = false;
  isActive = true;
  wishlistArray: number[] = [];
  constructor(private authService: AuthService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
    this.wishlistService.onAddedToFavorites.subscribe((_res: number) => {
      this.wishlistArray.push(1);
    });
    this.wishlistService.onRemovedFromFavorites.subscribe((_res: number) => {
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
  }
}
