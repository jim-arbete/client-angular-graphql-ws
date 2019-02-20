import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, tap, catchError } from 'rxjs/operators';
import { HomesChangedGQL, AllHomesGQL, Home } from './homes.graphql';

@Component({
  selector: 'app-homes',
  template: `
    <ng-container *ngIf="errors.length">
      <pre>
        <code *ngFor="let error of errors">{{error | json}} </code>
      </pre>
    </ng-container>
    <ng-container *ngIf="loggedIn">
      <div *ngIf="isLoading">Loading...</div>
      <div *ngFor="let home of homes | async">
        <app-home-widget [home]="home"></app-home-widget>
      </div>
    </ng-container>

    <button id="home-component-login" *ngIf="!loggedIn" (click)="doLogin()" mat-raised-button color="primary">Logga in</button>
  `,
  styles: [`
    .mat-raised-button {
      margin: 15px;
    }
    pre code {
      max-width: 70%;
      background-color: #eee;
      border: 1px solid #999;
      display: block;
      padding: 15px;
      margin: 10px;
    }
    code { background-color: #eee; }
  `]
})
export class HomesComponent implements OnInit, OnDestroy {

  homesSubscription: Subscription;
  homes: Observable<Home[]>;
  errors = [];
  isLoading = false;
  loggedIn = false;

  constructor(private allHomesGQL: AllHomesGQL, private homesChangedGQL: HomesChangedGQL) {}

  ngOnInit() {
    if (this.isAuth()) {
      this.fetch();
    }
  }

  fetch() {
    this.homes = this.allHomesGQL.watch()
    .valueChanges
    .pipe(
      tap(result => this.isLoading = result.loading),
      filter(result => !result.loading),
      map(result => result.data.Homes),
      catchError(error => {
        if (error.graphQLErrors) {
             error.graphQLErrors.forEach(e => this.errors.push(e.message) );
        }
        if (error.networkError) {
          this.errors.push(error.networkError);
        }

        return of([]); // default return
      })
    );

    // Websocket => Listen to ws-events on the backend-graphql-api
    // 1st .subscribe() is method of homesChangedGQL.subscribe()
    // 2nd .subscribe() is Observable<SubscriptionResult>
    this.homesSubscription = this.homesChangedGQL.subscribe().subscribe();
  }

  isAuth() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  doLogin(): void {
    // Mock login, a real login can be done with routes and redux-state/apollo-link-state/service stuff.
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIn0.Pt_bG1sexU2z0yQYFbAd-n47_EQpEfUkeIvpjtLUgLw'
    );
    this.loggedIn = true;
    this.ngOnInit();
  }

  ngOnDestroy() {
    this.homesSubscription.unsubscribe();
  }
}
