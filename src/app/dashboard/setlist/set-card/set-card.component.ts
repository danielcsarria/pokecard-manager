import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-card',
  templateUrl: './set-card.component.html',
  styleUrls: ['./set-card.component.scss']
})
export class SetCardComponent implements OnInit {

  @Input() set: any;

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSetClick(setId: string) {
    console.log(setId)
    this.route.navigate(['dashboard','card-list'], {queryParams: {set: setId}})
  }

}
