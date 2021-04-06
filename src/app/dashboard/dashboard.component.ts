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

  recentlyViewed;

  constructor(
    private authService: AuthService,
    private userService : UserService
  ) {
    
  }

  ngOnInit(): void {

  }



  onLogout(){
    this.authService.signOut();
  }

}
