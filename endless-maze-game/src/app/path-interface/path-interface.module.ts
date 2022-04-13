import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathInterfaceComponent } from './path-interface/path-interface.component';
import { PathImageModule } from './path-image/path-image.module';



@NgModule({
  declarations: [
    PathInterfaceComponent
  ],
  imports: [
    CommonModule,
    PathImageModule
  ],
  exports: [
    PathInterfaceComponent
  ]
})
export class PathInterfaceModule { }
