import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    const localRecentlyViewd = JSON.parse(localStorage.getItem('recentlyViewd'))
    this.userService.recentlyViewed.subscribe(data => {
      console.log("data =>", data)
      this.recentlyViwed = data ? data : localRecentlyViewd;      
    })
  }

}
