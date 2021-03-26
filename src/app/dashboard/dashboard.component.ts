import { Component, OnInit } from '@angular/core';
import { PokemonCard } from '../shared/models/pokemon-card.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  recentlyViewd;

  constructor(
    private authService: AuthService,
  ) {
    console.log(this.recentlyViewd)

  }

  ngOnInit(): void {
    this.getRecentlyViewd();
  }

  getRecentlyViewd() {
    const recentlyViewd = localStorage.getItem('recentlyViewd')
    if(recentlyViewd) {
      console.log(JSON.parse(recentlyViewd))
      this.recentlyViewd = JSON.parse(recentlyViewd);
    }
  }

  onLogout(){
    this.authService.signOut();
  }

}
