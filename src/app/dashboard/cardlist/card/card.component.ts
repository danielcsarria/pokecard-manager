import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: PokemonCard;
  @Input() showInCollection: boolean;
  
  showBtns: boolean = false;

  constructor(
    private router : Router,
    private CardService: CardService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(Object.keys(params).length > 0) {
        this.showBtns = true;  
      }
    })
  }

  onCardClick(card:PokemonCard) {
    this.router.navigate(['/dashboard', 'card'], {queryParams: {id: card.id}});
    this.CardService.addTorecentlyViewed(card)
  }

  onAddToCollection(card:PokemonCard) {
    this.CardService.addToCollection(card);
  }

}
