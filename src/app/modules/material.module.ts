import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
