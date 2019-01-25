import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HousesService } from './houses.service';

@Component({
  selector: 'app-houses',
  template: `
    <div *ngIf="loading | async">
    Loading...
    </div>
    <div *ngIf="errors | async">
      Error :(
    </div>

    <div *ngFor="let house of houses">
      <p>{{house.id}}: {{house.name}}</p>
    </div>
  `
})
export class HousesComponent implements OnInit {

  houses: any[]
  loading: boolean
  errors: any

  constructor(private _apollo: Apollo, private _housesService: HousesService) { }

  ngOnInit() {
    this._apollo.watchQuery<any>({
      query: gql`
      query {
        houses {
          id
          name
        }
      }
      `
    })
    .valueChanges.subscribe(({ data, loading, errors }) => {
      this.houses = data.houses
      this.loading = loading
      this.errors = errors
    })
  }

}
