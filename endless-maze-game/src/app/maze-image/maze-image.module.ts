import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeImageComponent } from './maze-image/maze-image.component';



@NgModule({
  declarations: [
    MazeImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MazeImageComponent
  ]
})
export class MazeImageModule { }
