import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
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
    if (this.isLoginMode) {
      // add code later
      console.log('Fire only if we are loging in');
    } else {
      this.authService.signUp(email, password).subscribe((res) => {
        console.log('Here', res), (error) => console.log('Error', error);
      });
    }
    form.reset();
  }
}
