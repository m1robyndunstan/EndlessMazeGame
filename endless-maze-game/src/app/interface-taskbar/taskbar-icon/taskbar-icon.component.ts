import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Input() eventText?: string;
  @Output() iconClicked = new EventEmitter<string>();

  imgUrl?: TaskbarImage;

  constructor() {
    this.imgUrl = this.imgDisabled;
   }

  ngOnInit(): void { 
    this.setImage();
  }

  doClick(): void {
    if (this.isEnabled) {
      this.iconClicked.emit(this.eventText);
      this.isOn = !this.isOn;
    }
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
