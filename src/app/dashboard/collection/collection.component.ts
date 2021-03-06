import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  collectionSet: any = []; 

  constructor(
    private apiService : ApiService,
    private cardService : CardService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getSetList();
  }

  getSetList() {
    const setList = []
    const collection = this.cardService.getCollection();
    const filtered = new Set();

    collection.map((col) => {
      setList.push(col.set);
    })

    const filteredCollection = setList.filter(el => {
      const duplicate = filtered.has(el.id);
      filtered.add(el.id);
      return !duplicate;
    });

    this.collectionSet = filteredCollection;
  }

  onCollectionSetClick(setID: string) {
    this.router.navigate(['/dashboard', 'card-list'], {queryParams:{
      myCollection : true,
      setID : setID
    }})
  }

  

}
