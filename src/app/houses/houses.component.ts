import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HousesChangedGQL, AllHousesGQL, House } from './houses.graphql';

@Component({
  selector: 'app-houses',
  template: `
    <div *ngIf="loading | async">
    Loading...
    </div>
    <div *ngIf="errors | async">
      Error :(
    </div>

    <div *ngFor="let house of houses | async">
      <h4>{{house.id}}: {{house.name}}</h4>
      <app-house-widget [house]="house"></app-house-widget>
    </div>
  `
})
export class HousesComponent implements OnInit {

  houses: Observable<House[]>

  constructor(private allHousesGQL: AllHousesGQL, private housesChangedGQL: HousesChangedGQL) {
    this.housesChangedGQL.subscribe()
  }

  ngOnInit() {
    this.houses = this.allHousesGQL.watch()
    .valueChanges
    .pipe(
      map(result => result.data.houses)
    )
  }

}
