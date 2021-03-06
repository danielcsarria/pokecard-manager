import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CardService } from '../shared/services/card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {
    
  }

  ngOnInit(): void {}
  
  onLogout(){
    this.authService.signOut();
  }

}
