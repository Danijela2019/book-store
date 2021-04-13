import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthData } from 'src/app/models/AuthData';
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
  constructor(private authService: AuthService) {}

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

    let authObservable: Observable<AuthData>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      (res) => {
        console.log('Response data', res);
        this.isLoading = false;
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
