import { Component, Input, OnInit } from '@angular/core';
import { InterfaceState } from 'src/app/maze-main/interface-state';
import { TaskbarImage } from '../taskbar-image';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  @Input() state?: InterfaceState;

  constructor() { }

  ngOnInit(): void {
  }

  doIconClick($event: string): void {
    if (this.state) {
      switch($event) {
        case "map":
          if (this.state.mapEnabled) {
            this.state.mapDisplayed = !this.state.mapDisplayed;
          }
          break;
        default:
          break;
      }
    }
  }

  // needed to use the enum on the HTML
  public get taskbarImage(): typeof TaskbarImage {
    return TaskbarImage; 
  }
}
