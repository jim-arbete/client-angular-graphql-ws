import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
        <div *ngFor="let room of house.rooms">
          <h5>{{room.name}}</h5>
          <p>Temperature: {{room.temperature}}</p>
          <p>Humidity: {{room.humidity}}
        </div>
      <!-- <app-house-widget [house]="house"></app-house-widget> -->
    </div>
  `
})
export class HousesComponent implements OnInit, OnDestroy {

  housesSubscription: Subscription
  houses: Observable<House[]>

  constructor(private allHousesGQL: AllHousesGQL, private housesChangedGQL: HousesChangedGQL) {}

  ngOnInit() {
    this.houses = this.allHousesGQL.watch()
    .valueChanges
    .pipe(
      map(result => result.data.houses)
    )

    // Websocket => Listen to ws-events on the backend-graphql-api
    // 1st .subscribe() is method of housesChangedGQL.subscribe()
    // 2nd .subscribe() is Observable<SubscriptionResult>
    this.housesSubscription = this.housesChangedGQL.subscribe().subscribe()
  }

  ngOnDestroy() {
    this.housesSubscription.unsubscribe();
  }
}