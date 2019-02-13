import { Injectable } from '@angular/core';
import { Query, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

export interface Home {
  id: number;
  name: string;
  rooms: Room[];
}

export interface Room {
  name: string;
  temperature: number;
  humidity: number;
}

export interface HomesQuery {
  Homes: Home[];
}

export interface HomesChangedSubscription {
  HomesChanged: Home[];
}

@Injectable({
  providedIn: 'root'
})
export class AllHomesGQL extends Query<HomesQuery> {
  document = gql`
    query {
      Homes {
        id
        name
        rooms {
          name
          temperature
          humidity
        }
      }
    }
  `;
  operationName: 'homes';
}

@Injectable({
  providedIn: 'root',
})
export class HomesChangedGQL extends Subscription<HomesChangedSubscription> {
  document = gql`
    subscription {
      HomesChanged {
        id
        name
        rooms {
          name
          temperature
          humidity
        }
      }
    }
  `;
}
