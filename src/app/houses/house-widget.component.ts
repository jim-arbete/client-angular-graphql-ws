import { Component, OnInit, Input } from '@angular/core';
import { House } from './houses.graphql';

@Component({
  selector: 'app-house-widget',
  template: `
    <div *ngFor="let room of house.rooms">
      <h5>{{room.name}}</h5>
      <p>Temperature: {{room.temperature}}</p>
      <p>Humidity: {{room.humidity}}
    </div>
  `
})
export class HouseWidgetComponent implements OnInit {

  @Input() house: House

  constructor() { }

  ngOnInit() {
  }

}
