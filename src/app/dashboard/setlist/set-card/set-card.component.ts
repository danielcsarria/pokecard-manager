import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-card',
  templateUrl: './set-card.component.html',
  styleUrls: ['./set-card.component.scss']
})
export class SetCardComponent implements OnInit {

  @Input() set: any;

  constructor() { }

  ngOnInit(): void {
  }

}
