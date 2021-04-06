import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
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
    private authService: AuthService,
    private router : Router
  ) { 
    
  }

  ngOnInit(): void {
    const localrecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'))
    
    this.authService.userMeta.subscribe((data: []) => {
      // console.log("USER META =>", data)
      // console.log("recentlyViewed =>", data['recentlyViewed'])
      this.recentlyViwed = data['recentlyViewed'];
    })

    this.userService.recentlyViewed.subscribe(data => {
      this.recentlyViwed = data ? data : localrecentlyViewed;      
    })
  }

  onSearch(event){
    console.log(event.target.value)
    this.router.navigate(['/dashboard', 'card-list'], {queryParams:{cardSearch: event.target.value}})
  }

}
