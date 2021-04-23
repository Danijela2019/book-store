import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  addedToFavorites: boolean = false;

  text: string;
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private wishlistService: WishlistService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onHeartClicked(clickedBook: Book) {
    this.wishlistService.addBooksToWishList(clickedBook).subscribe((_res) => (this.text = 'Successfully added'));
    this.addedToFavorites = true;
    this.wishlistService.onAddedToFavorites.emit(1);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
