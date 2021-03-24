import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CardSet } from '../../shared/models/cardset.model';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  setList : CardSet[];
  
  constructor(
    private apiService: ApiService
  ) { 
  }

  ngOnInit(): void {
    this.getSetList()
  }

  getSetList() {
    const localSetList = localStorage.getItem('setList')
    if(localSetList) {
      this.setList = JSON.parse(localSetList);
    } else {
      this.apiService.getSetList().subscribe((data: any[]) => {
        let setList = []
        data['data'].map((set) => {
          setList.push(new CardSet(set.name, set.series, set.releaseDate, set.images.logo))
        })
        this.setList = setList
        localStorage.setItem('setList', JSON.stringify(setList))
      })
    }
    
  }

}
