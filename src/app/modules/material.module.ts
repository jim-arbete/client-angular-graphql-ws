import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatListModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatListModule
  ]
})
export class MaterialModule { }
