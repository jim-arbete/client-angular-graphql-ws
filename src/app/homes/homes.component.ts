import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomesChangedGQL, AllHomesGQL, Home } from './homes.graphql';

@Component({
  selector: 'app-homes',
  template: `
    <div *ngFor="let home of homes | async">
      <app-home-widget [home]="home"></app-home-widget>
    </div>
  `
})
export class HomesComponent implements OnInit, OnDestroy {

  homesSubscription: Subscription
  homes: Observable<Home[]>

  constructor(private allHomesGQL: AllHomesGQL, private homesChangedGQL: HomesChangedGQL) {}

  ngOnInit() {
    this.homes = this.allHomesGQL.watch()
    .valueChanges
    .pipe(
      map(result => result.data.Homes)
    )

    // Websocket => Listen to ws-events on the backend-graphql-api
    // 1st .subscribe() is method of homesChangedGQL.subscribe()
    // 2nd .subscribe() is Observable<SubscriptionResult>
    this.homesSubscription = this.homesChangedGQL.subscribe().subscribe()
  }

  ngOnDestroy() {
    this.homesSubscription.unsubscribe();
  }
}
