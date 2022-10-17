import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      throw new Error('Invalid form');
      authForm.reset();
      return;
    }

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.signIn(authForm.value.email, authForm.value.password);
    } else {
      authObservable = this.authService.signUp(authForm.value.email, authForm.value.password);
    }

    authObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
  }


}
