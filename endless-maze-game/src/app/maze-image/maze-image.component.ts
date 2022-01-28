import { Component, OnInit, Input } from '@angular/core';
import { MazeImage } from '../MazeImage';

@Component({
  selector: 'app-maze-image',
  templateUrl: './maze-image.component.html',
  styleUrls: ['./maze-image.component.scss']
})
export class MazeImageComponent implements OnInit {

  @Input() imageLeftUrl?: string;
  @Input() imageCenterUrl?: string;
  @Input() imageRightUrl?: string;

  constructor() { }

  ngOnInit(): void {
    this.imageLeftUrl = MazeImage.WallLeft;
    this.imageCenterUrl = MazeImage.WallCenter;
    this.imageRightUrl = MazeImage.WallRight;
  }

}
