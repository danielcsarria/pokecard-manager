import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userInfo.subscribe(
      (user: any) => {
        console.log("user!!", user.displayName)
        this.userName = user.displayName;
        this.userImage = user.photoURL;
      }
    )
  }

  // getUserInfo() {
  //   this.userName = this.authService.getUserData().displayName; 
  //   this.userImage = this.authService.getUserData().photoURL; 
  // }

  onLogout(){ 
    this.authService.signOut()
  }

}
