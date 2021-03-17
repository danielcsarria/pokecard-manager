import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ])

  matcher = new MyErrorStateMatcher();

  authMessage: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.authMessage.subscribe(
      (authMessage: string) => {
        this.authMessage = authMessage
      }
    )
  }

  onLogin(email: string, password: string) {
    if(email && password) {
      this.authService.signIn(email, password)
    }
  }

  onGoogleLogin(event) {
    event.stopPropagation()
    this.authService.googleAuth();
  }

}
