import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  cardDetail : any;
  inCollection = false;
  thisCard: PokemonCard;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private userService : UserService 
  ) { }

  ngOnInit(): void {
      
    this.api.getCard(this.route.snapshot.queryParams.id).subscribe(data => {
      console.log(data)
      const d = data['data']
      this.cardDetail = d;
      var inCollection = false
      const collection = this.userService.getCollection();
      collection.map(col => {
        if(col.id === this.cardDetail.id) {
          inCollection = true;
          this.inCollection = true;
        }
      })
      this.thisCard = new PokemonCard(
        d.id,
        d.set,
        d.set.id,
        d.number,
        d.name,
        d.rarity,
        d.types ? d.types : '',
        d.supertype,
        d.subtypes ? d.subtypes : '',
        d.tcgplayer ? d.tcgplayer.prices : '',
        d.tcgplayer ? d.tcgplayer.url : '',
        d.images.small ? d.images.small : d.image,
        inCollection
      )  
    })

  }

  onAddToCollection() {
    this.inCollection = true;
    this.userService.addToCollection(this.thisCard);
  }

}
