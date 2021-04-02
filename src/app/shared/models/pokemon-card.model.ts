export class PokemonCard {
    
    constructor(
      public id: any,
      public set: any,
      public setID: string,
      public number : any,
      public name: any,
      public rarity: any,
      public types: any,
      public superType: any,
      public subTypes : any,
      public prices: any,
      public priceLink: any,
      public image: any,
      public inCollection : boolean = false,
    ) {}

  }