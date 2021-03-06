import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PokemonCard } from '../models/pokemon-card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  recentlyViewed$ = new BehaviorSubject<any>(null)

  constructor(
    private router: Router,
    private afs: AngularFirestore
  ) { }

  userInfo: AngularFirestoreCollection<any>;

  getUserInfo(uid) {
    return this.afs.collection('userInfo', ref => ref.where('uid', '==', uid)).valueChanges()
  }


  addTorecentlyViewed(pokemonCard: PokemonCard) {
    const lsrecentlyViewed = localStorage.getItem('recentlyViewed');
    const recentlyViewed = lsrecentlyViewed ? JSON.parse(lsrecentlyViewed) : [];
    const filtered = new Set();
    console.log("recentlyViewed =", recentlyViewed)
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

    localStorage.setItem('recentlyViewed', JSON.stringify(filteredArr));
    this.updateUserMeta();
    this.recentlyViewed$.next(filteredArr);
  }

  goToDetail(card: PokemonCard) {
    this.addTorecentlyViewed(card);
    this.router.navigate(['/dashboard', 'card'], {queryParams: {id: card.id}});
  }

  addToCollection(card: PokemonCard){
    const lsCollection = localStorage.getItem('collection');
    const collection = lsCollection ? JSON.parse(lsCollection) : [];
    const filtered = new Set();
    card['inCollection'] = true;
    collection.push(card);
    this.addTorecentlyViewed(card);
    const filteredCollection = collection.filter(el => {
      const duplicate = filtered.has(el.id);
      filtered.add(el.id);
      return !duplicate;
    });
    localStorage.setItem('collection', JSON.stringify(filteredCollection));
    this.updateUserMeta();
  }

  removeFromCollection(card:PokemonCard) {
    const collection = this.getCollection();
    collection.forEach((col, index) => {
      if(col.id === card.id){
        console.log("DELETE ", col.name + " in index ", index);
        collection.splice(index, 1)
      }
    })
    localStorage.setItem('collection', JSON.stringify(collection))
    this.updateUserMeta();
  }

  getCollection() {
    return localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : [];
  }

  updateUserMeta() {
    //const uid = localStorage.getItem('uid')
    const collectionID = localStorage.getItem('collectionID');
    const collection = localStorage.getItem('collection');
    const recentlyViewed = localStorage.getItem('recentlyViewed');
    const cardView = localStorage.getItem('cardView');
    this.afs.doc(`userInfo/${collectionID}`).update({
      cardView: cardView,
      collection: collection,
      recentlyViewed: recentlyViewed,
      //uid: uid
    })
  }





}
