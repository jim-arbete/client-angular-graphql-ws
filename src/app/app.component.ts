import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <mat-icon style="margin-right:15px;">settings_remote</mat-icon> {{appTitle}}
    </mat-toolbar>
    <app-homes></app-homes>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  appTitle = 'Homes App';
}
