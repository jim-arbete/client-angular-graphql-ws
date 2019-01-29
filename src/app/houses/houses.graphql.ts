import { Injectable } from '@angular/core';
import { Query, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

export interface House {
  id: number
  name: string
  votes: number
  rooms: Room[]
}

export interface Room {
  name: string
  temperature: number
  humidity: number
}

export interface HousesQuery {
  houses: House[]
}

export interface HousesChangedSubscription {
  housesChanged: House[]
}

@Injectable({
  providedIn: 'root'
})
export class AllHousesGQL extends Query<HousesQuery, {}> {
  document = gql`
    query {
      houses {
        id
        name
        rooms {
          name
          temperature
          humidity
        }
      }
    }
  `
}


@Injectable({
  providedIn: 'root',
})
export class HousesChangedGQL extends Subscription<HousesChangedSubscription, {}> {
  document = gql`
    subscription {
      housesChanged {
        id
        name
        rooms {
          name
          temperature
          humidity
        }
      }
    }
  `
}
