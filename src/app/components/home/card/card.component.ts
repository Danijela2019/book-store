import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('fade', [
      state('normal', style({ opacity: 1 })),
      state('fadein', style({ opacity: 0 })),
      transition('normal => fadein', [animate(1000)]),
      transition('fadein => normal', [animate(1000)]),
    ]),
  ],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() book: Book;

  private userSubscription: Subscription;
  isAuthenticated = false;
  state = 'normal';
  timer: any;

  constructor(private wishlistService: WishlistService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onHeartClicked(clickedBook: Book) {
    this.wishlistService.addBooksToWishList(clickedBook).subscribe();
    this.wishlistService.onAddedToFavorites.next(clickedBook);
    this.state = 'fadein';
    this.timer = setTimeout(() => {
      this.state = 'normal';
    }, 1000);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    clearTimeout(this.timer);
  }
}
