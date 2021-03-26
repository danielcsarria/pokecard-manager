import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  cardDetail : any;
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService 
  ) { }

  ngOnInit(): void {
    this.api.getCard(this.route.snapshot.queryParams.id).subscribe(data => {
      console.log(data)
      this.cardDetail = data['data'];
    })
  }

}
