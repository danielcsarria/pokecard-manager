import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  setList: any;

  constructor(
    private http: HttpClient
  ) { }

  public getSetList(){
    return this.http.get("https://api.pokemontcg.io/v2/sets")
  }

}
