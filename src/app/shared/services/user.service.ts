import { Injectable } from '@angular/core';
import { PokemonCard } from '../models/pokemon-card.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  recentlyViewed : PokemonCard[] = [];

  constructor() { }

  addToRecentlyViewd(pokemonCard: PokemonCard) {
    console.log(pokemonCard)
    const lsRecentlyViewd = localStorage.getItem('recentlyViewd');
    const recentlyViewed = lsRecentlyViewd ? JSON.parse(lsRecentlyViewd) : [];
    recentlyViewed.push(pokemonCard);
    if(recentlyViewed.length > 5){
      recentlyViewed.shift();
    }
    localStorage.setItem('recentlyViewd', JSON.stringify(recentlyViewed));
    this.recentlyViewed = recentlyViewed;
  }




}
