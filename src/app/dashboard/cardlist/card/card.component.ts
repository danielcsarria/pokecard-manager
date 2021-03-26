import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: PokemonCard;

  constructor(
    private router : Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  onCardClick(card:PokemonCard) {
    this.router.navigate(['/dashboard', 'card'], {queryParams: {id: card.id}});
    this.user.addToRecentlyViewd(card)
  }

}
