import { Component, OnInit, Input } from '@angular/core';
import { Home, Room } from './homes.graphql';

@Component({
  selector: 'app-home-widget',
  template: `
    <mat-card class="card" md-3>

      <mat-card-header>
        <div mat-card-avatar><mat-icon>home</mat-icon></div>
        <mat-card-title>{{home.name}}</mat-card-title>
        <mat-card-subtitle>Visar realtidsdata från varje rum</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <table mat-table [dataSource]="rooms" class="mat-elevation-z8">

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let room"> {{room.name}} </td>
        </ng-container>

        <ng-container matColumnDef="temperature">
          <th mat-header-cell *matHeaderCellDef> Temperatur </th>
          <td mat-cell *matCellDef="let room"> {{room.temperature}} </td>
        </ng-container>

        <ng-container matColumnDef="humidity">
          <th mat-header-cell *matHeaderCellDef> Luftfuktighet </th>
          <td mat-cell *matCellDef="let room"> {{room.humidity}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card-content>

  </mat-card>
  `,
  styles: [`
    .mat-card {
      max-width: 80%;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .mat-icon { font-size: 48px; }
    table {
      width: 100%;
    }
  `]
})
export class HomeWidgetComponent implements OnInit {

  @Input() home: Home;
  rooms: Room[];
  displayedColumns: string[] = ['name', 'temperature', 'humidity'];

  constructor() { }

  ngOnInit() {
    this.rooms = this.home.rooms;
  }

}
