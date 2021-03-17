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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ])

  passwordError: string = 'Password is <strong>required</strong>';

  matcher = new MyErrorStateMatcher();

  authMessage: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authMessage.subscribe(
      (authMessage: string) => {
        this.authMessage = authMessage
      }
    )
  }

  onRegister(email: string, password:string, verifyPassword: string){
    if(email && password && verifyPassword) {
      if (password == verifyPassword) {
        this.authService.register(email, password);
      } else {
        window.alert("PASSWORDS DO NOT MATCH")
      }
    }
  }

}
