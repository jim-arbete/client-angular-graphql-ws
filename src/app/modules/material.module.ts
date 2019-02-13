import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ]
})
export class MaterialModule { }
