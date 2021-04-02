import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonCard } from 'src/app/shared/models/pokemon-card.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: PokemonCard;
  showBtns: boolean = false;

  constructor(
    private router : Router,
    private userService: UserService,
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
    this.userService.addToRecentlyViewd(card)
  }

  onAddToCollection(card:PokemonCard) {
    this.userService.addToCollection(card);
  }

}
