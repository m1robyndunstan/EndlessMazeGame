import { Component, Input, OnInit } from '@angular/core';
import { TaskbarImage } from '../taskbar-image';

@Component({
  selector: 'app-taskbar-icon',
  templateUrl: './taskbar-icon.component.html',
  styleUrls: ['./taskbar-icon.component.scss']
})
export class TaskbarIconComponent implements OnInit {

  @Input() imgDisabled?: TaskbarImage;
  @Input() imgOff?: TaskbarImage;
  @Input() imgOn?: TaskbarImage;

  @Input() isEnabled?: boolean;
  @Input() isOn?: boolean;

  imgUrl?: TaskbarImage;

  constructor() {
    this.imgUrl = this.imgDisabled;
   }

  ngOnInit(): void { 
    this.setImage();
  }

  private setImage() {
    if (!this.isEnabled) {
      this.imgUrl = this.imgDisabled;
    }
    else if (this.isOn) {
      this.imgUrl = this.imgOn;
    }
    else {
      this.imgUrl = this.imgOff;
    }
  }
}
