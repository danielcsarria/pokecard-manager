import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  recentlyViwed :any;
  
  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    const localRecentlyViewd = JSON.parse(localStorage.getItem('recentlyViewd'))
    this.userService.recentlyViewed.subscribe(data => {
      console.log("data =>", data)
      this.recentlyViwed = data ? data : localRecentlyViewd;      
    })
  }

  onSearch(event){
    console.log(event.target.value)
    this.router.navigate(['/dashboard', 'card-list'], {queryParams:{cardSearch: event.target.value}})
  }

}
