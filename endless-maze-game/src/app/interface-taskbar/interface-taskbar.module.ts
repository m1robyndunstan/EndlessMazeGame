import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { TaskbarIconComponent } from './taskbar-icon/taskbar-icon.component';



@NgModule({
  declarations: [
    TaskbarComponent,
    TaskbarIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TaskbarComponent
  ]
})
export class InterfaceTaskbarModule { }
