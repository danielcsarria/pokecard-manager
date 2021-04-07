import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  recentlyViwed :any;
  
  constructor(
    private cardService : CardService,
    private authService: AuthService,
    private router : Router
  ) { 
    
  }

  ngOnInit(): void {
    const localrecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'))
  
    this.authService.recentlyViewed$.subscribe((data) => {
      if(data) {
        this.recentlyViwed = JSON.parse(data);
      }
    })
    this.cardService.recentlyViewed$.subscribe(data => {
      this.recentlyViwed = data ? data : localrecentlyViewed;      
    })
  }

  onSearch(event){
    console.log(event.target.value)
    this.router.navigate(['/dashboard', 'card-list'], {queryParams:{cardSearch: event.target.value}})
  }

}
