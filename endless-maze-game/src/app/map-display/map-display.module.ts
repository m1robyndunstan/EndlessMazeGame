import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDisplayComponent } from './map-display/map-display.component';
import { MapBlockComponent } from './map-block/map-block.component';



@NgModule({
  declarations: [
    MapDisplayComponent,
    MapBlockComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapDisplayComponent
  ]
})
export class MapDisplayModule { }
