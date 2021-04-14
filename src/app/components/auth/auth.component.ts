import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchLoginMode(logForm: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    logForm.reset();
  }

  onCancel(logForm: NgForm) {
    logForm.reset();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObservable: Observable<any>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      (_res) => {
        this.isLoading = false;
        this.router.navigate(['/wishlist']);
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
