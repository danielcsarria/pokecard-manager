import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  setList: any;
  private baseURL: string = 'https://api.pokemontcg.io/v2/';

  constructor(
    private http: HttpClient
  ) { }

  public getSetList(){
    return this.http.get(this.baseURL + "sets")
  }

  public getSetCardList(setID: string) {
    return this.http.get(this.baseURL + 'cards?q=set.id:' + setID)
  }

  public getCardSearch(name:string) {
    return this.http.get(this.baseURL + 'cards?q=name:' + name +"*")
  }

  public getCard(cardID: string) {
    return this.http.get(this.baseURL + 'cards/' + cardID)
  }
  

}
