import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { ApiService } from 'src/app/shared/services/api.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import { UserService } from 'src/app/shared/services/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {

  myControl = new FormControl();
  cardList = [];
  listTitle : string;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredValue : string;
  gridView : string;
  loading: boolean = true;
  displayedColumns: string[] = ['btns', 'set', 'no', 'name', 'rarity', 'types', 'supertype', 'subtypes', 'price'];
  
  dataSource = new MatTableDataSource<PokemonCard[]>();

  @ViewChild(MatSort) sort: MatSort;


  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api : ApiService,
    private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setCardList(this.route.snapshot.queryParams)
    this.route.queryParams.subscribe(params => {
      this.setCardList(params)
    })
    this.getCardView('grid_on');
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
        this.listTitle = `${setInfo.name}(${setInfo.id})`;
        this.setCards(data);
        this.loading = false;
      })
    }
    if(params.cardSearch) {
      this.api.getCardSearch(params.cardSearch).subscribe(data => {
        this.listTitle = `Card Search: ${params.cardSearch}`;
        this.setCards(data);
        this.loading = false;
      })
    }
    if(params.myCollection) {
      const data = this.userService.getCollection();
      const setID = params.setID;
      const collection = [];
      data.map(d => {
        if(d.setID == setID) {
          collection.push(d);
          this.options.push(d.name);
        }
      })
      const setInfo = collection[0].set;
      this.listTitle = `My ${setInfo.name} Collection ( ${collection.length} / ${setInfo.printedTotal} )`;
      this.cardList = collection;
      this.loading = false;
    }
  }

  onCardClick(card: PokemonCard) {
    this.userService.goToDetail(card);
  }

  onBaseClick(id:string){
    if(this.route.snapshot.queryParams.set != id) {
      this.loading = true;
    }
    this.router.navigate(['/dashboard', 'card-list'], {queryParams:{set:id}})
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
    const collection = this.userService.getCollection();
    const dataSet = data['data'] ? data['data'] : data;
    dataSet.map(card => {
      var inCollection = false
      collection.map(col => {
        if(col.id === card.id) {
          inCollection = true;
        }
      })          
      const pokemonCard = new PokemonCard(
        card.id,
        card.set,
        card.set.id,
        card.number,
        card.name,
        card.rarity,
        card.types ? card.types : '',
        card.supertype,
        card.subtypes ? card.subtypes : '',
        card.tcgplayer ? card.tcgplayer.prices : '',
        card.tcgplayer ? card.tcgplayer.url : '',
        card.images.small ? card.images.small : card.image,
        inCollection
      );
      cardList.push(pokemonCard);
      options.push(card.name)
    })
    this.cardList = cardList;
    this.options = options;
  }

  onAdd(card:PokemonCard) {
    this.userService.addToCollection(card);
  }

  onRemove(card:PokemonCard) {
    //this.userService.removeFromCollection(card);
    // this.cardList= this.cardList;
    this.cardList.forEach((cl, index) => {
      if(cl.id === card.id) {
        this.cardList.splice(index, 1);
      }
    });

    // this.changeDetectorRefs.detectChanges();
    this.dataSource.data = this.dataSource.data;
    
    console.log(this.cardList);
    // this.cardList = newCardList;
  }
  

}
