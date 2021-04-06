import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName: string;
  userImage: string;

  userInfo : User;

  constructor(
    private authService: AuthService,
    private router : Router
  ) {
    this.getUserInfo();
  }

  ngOnInit(): void {
    
    this.authService.userInfo.subscribe(
      (user: any) => {
        const userInfo: User = {
          uid: (user.uid) ? user.uid : '',
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        }
        this.userInfo = userInfo;
      }
    )
  }

  getUserInfo() {
    const userInfo: User = this.authService.getUserData();
    this.userInfo = userInfo;
  }

  setUserData(user) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    this.userInfo = userData;
  }

  onLogout(){ 
    this.authService.signOut();
  }

  onLogoClick(){
    this.router.navigate(['/dashboard']);
  }

}
