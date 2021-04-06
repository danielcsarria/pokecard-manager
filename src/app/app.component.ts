import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: AngularFirestore
  ) {

  }

  ngOnInit() {
    console.log("logged in?: ",this.auth.isLoggedIn)
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard'])
    } else {
      this.router.navigate(['login'])
    }
  }

}
