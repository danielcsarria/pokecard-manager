import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonCard } from '../models/pokemon-card.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  recentlyViewed = new BehaviorSubject<any>(null)

  constructor() { }

  addToRecentlyViewd(pokemonCard: PokemonCard) {
    console.log(pokemonCard)
    const lsRecentlyViewd = localStorage.getItem('recentlyViewd');
    const recentlyViewed = lsRecentlyViewd ? JSON.parse(lsRecentlyViewd) : [];
    const filtered = new Set();
    recentlyViewed.push(pokemonCard);

    const filteredArr = recentlyViewed.filter(el => {
      const duplicate = filtered.has(el.id);
      filtered.add(el.id);
      return !duplicate;
    });

    if(filteredArr.length > 5){
      filteredArr.shift();
    }
    localStorage.setItem('recentlyViewd', JSON.stringify(filteredArr));
    this.recentlyViewed.next(filteredArr);
  }





}
