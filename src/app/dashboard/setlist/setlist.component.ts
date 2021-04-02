import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CardSet } from '../../shared/models/cardset.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {
  myControl = new FormControl();
  setList : CardSet[];
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredValue : string;
  loading: boolean = true;

  
  constructor(
    private apiService: ApiService
  ) {  }

  ngOnInit(): void {
    this.getSetList();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getSetList() {
    this.apiService.getSetList().subscribe((data: any[]) => {
      let setList = [];
      data['data'].map((set) => {
        setList.push(new CardSet(set.name, set.id, set.series, set.releaseDate, set.images.logo))  
      })
      this.setList = setList;
      this.setOptions(setList);
      this.loading = false;
    })
    
  }

  setOptions(options: any[]) {
    options.map((option) => {
      this.options.push(option.name);
    })
  }

}
