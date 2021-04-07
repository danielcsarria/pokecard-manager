import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { CardService } from 'src/app/shared/services/card.service';

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
    private CardService : CardService 
  ) { }

  ngOnInit(): void {
      
    this.api.getCard(this.route.snapshot.queryParams.id).subscribe(data => {
      console.log(data)
      const d = data['data']
      this.cardDetail = d;
      var inCollection = false
      const collection = this.CardService.getCollection();
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

  onAdd() {
    this.inCollection = true;
    this.CardService.addToCollection(this.thisCard);
  }

  onRemove() {
    this.inCollection = false;
    this.CardService.removeFromCollection(this.thisCard);
  }



}
