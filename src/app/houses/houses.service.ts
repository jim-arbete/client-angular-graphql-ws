import { Injectable } from '@angular/core';
import {Query} from 'apollo-angular';
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

@Injectable({
  providedIn: 'root'
})
export class HousesService extends Query<Response> {
  document = gql`
    query {
      houses {
        id
        name
      }
    }
  `;
}
