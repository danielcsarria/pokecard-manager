import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PokemonCard } from '../models/pokemon-card.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  recentlyViewed = new BehaviorSubject<any>(null)

  constructor(
    private router: Router
  ) { }

  addToRecentlyViewd(pokemonCard: PokemonCard) {
    const lsRecentlyViewd = localStorage.getItem('recentlyViewd');
    const recentlyViewed = lsRecentlyViewd ? JSON.parse(lsRecentlyViewd) : [];
    const collection = this.getCollection();
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

    filteredArr.map(card => {

    })

    localStorage.setItem('recentlyViewd', JSON.stringify(filteredArr));
    this.recentlyViewed.next(filteredArr);
  }

  goToDetail(card: PokemonCard) {
    this.addToRecentlyViewd(card);
    this.router.navigate(['/dashboard', 'card'], {queryParams: {id: card.id}});
  }

  addToCollection(card: PokemonCard){
    
    const lsCollection = localStorage.getItem('collection');
    const collection = lsCollection ? JSON.parse(lsCollection) : [];
    const filtered = new Set();
    card['inCollection'] = true;
    collection.push(card);
    this.addToRecentlyViewd(card);
    const filteredCollection = collection.filter(el => {
      const duplicate = filtered.has(el.id);
      filtered.add(el.id);
      return !duplicate;
    });

    
    localStorage.setItem('collection', JSON.stringify(filteredCollection));
  }

  getCollection() {
    return localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : [];
  }



}
