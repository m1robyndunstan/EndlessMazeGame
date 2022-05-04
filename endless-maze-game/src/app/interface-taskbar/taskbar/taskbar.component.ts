import { Component, OnInit } from '@angular/core';
import { TaskbarImage } from '../taskbar-image';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // needed to use the enum on the HTML
  public get taskbarImage(): typeof TaskbarImage {
    return TaskbarImage; 
  }
}
