import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
