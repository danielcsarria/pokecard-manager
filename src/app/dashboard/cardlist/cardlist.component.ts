import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { ApiService } from 'src/app/shared/services/api.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {

  myControl = new FormControl();
  cardList : PokemonCard[];
  listTitle : string;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredValue : string;
  gridView : string;

  displayedColumns: string[] = ['set', 'no', 'name', 'rariry', 'types', 'supertype', 'subtypes', 'price'];
   
  @ViewChild(MatSort) sort: MatSort;


  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api : ApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.getCardView('grid_on');
    this.setCardList(params);
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

  setCardList(params){
    if(params.set) {
      this.api.getSetCardList(params.set).subscribe(data => {
        const setInfo = data['data'][0].set;
        this.listTitle = `${setInfo.name}(${setInfo.id})`
        this.setCards(data)
      })
    }
    if(params.cardSearch) {
      this.api.getCardSearch(params.cardSearch).subscribe(data => {
        this.listTitle = `Card Search: ${params.cardSearch}`
        this.setCards(data);
      })
    }
  }

  onRowClick(card: PokemonCard) {
    this.userService.addToRecentlyViewd(card)
    this.router.navigate(['/dashboard', 'card'], {queryParams: {id: card.id}});
    
  }

  onToggleClick(view:any) {
    localStorage.setItem('cardView', view)
  }

  getCardView(viewDefault: string) {
    const cardView = localStorage.getItem('cardView')
    this.gridView =  cardView ? cardView : viewDefault 
  }

  setCards(data) {
    const cardList = [];
    const options = [];
    data['data'].map(card => {          
      const pokemonCard = new PokemonCard(
        card.id,
        card.set.name,
        card.set.id,
        card.number,
        card.name,
        card.rarity,
        card.types ? card.types : '',
        card.supertype,
        card.subtypes ? card.subtypes : '',
        card.tcgplayer ? card.tcgplayer.prices : '',
        card.tcgplayer ? card.tcgplayer.url : '',
        card.images.small
      );
      cardList.push(pokemonCard);
      options.push(card.name)
    })
    this.cardList = cardList;
    this.options = options;
  }
  

}
