import { Component, OnInit, Input } from '@angular/core';
import { MazeState } from '../MazeState';
import { MazeDirection } from '../MazeDirection';
import { MazeImage } from '../MazeImage';
import { MazeSpecial } from '../MazeSpecial';

@Component({
  selector: 'app-maze-interface',
  templateUrl: './maze-interface.component.html',
  styleUrls: ['./maze-interface.component.scss']
})
export class MazeInterfaceComponent implements OnInit {

  @Input() currentGame?: MazeState;

  playerFacingDir?: string;
  locationDescription?: string
  mazeLeftImage?: MazeImage;
  mazeCenterImage?: MazeImage;
  mazeRightImage?: MazeImage;
  showForwardButton: boolean;

  constructor() {
    this.showForwardButton = false;
   }

  ngOnInit(): void {
    if (this.currentGame) {
      this.playerFacingDir = MazeDirection[this.currentGame.playerDirection ? this.currentGame.playerDirection : MazeDirection.North];
      
      this.configureInterfaceForCurrentLocation();
    }
  }

  setMazeImages(): void {
    if (this.currentGame) {
      if (this.currentGame.getSpecialType() == MazeSpecial.Exit) {
        this.mazeLeftImage = MazeImage.WallLeft;
        this.mazeCenterImage = MazeImage.WallCenter;
        this.mazeRightImage = MazeImage.WallRight;
      }
      else {
        this.mazeLeftImage = this.currentGame.hasLeftPath() ? MazeImage.PathLeft : MazeImage.WallLeft;
        this.mazeCenterImage = this.currentGame.hasForwardPath() ? MazeImage.PathCenter : MazeImage.WallCenter;
        this.mazeRightImage = this.currentGame.hasRightPath() ? MazeImage.PathRight : MazeImage.WallRight;
      }
    }
    else {
      this.mazeLeftImage = MazeImage.WallLeft;
      this.mazeCenterImage = MazeImage.WallCenter;
      this.mazeRightImage = MazeImage.WallRight;
    }
  }

  moveForward(): void {
    if (this.currentGame) this.currentGame.moveForward();
    this.configureInterfaceForCurrentLocation();
  }
  turnRight(): void {
    if (this.currentGame) this.currentGame.turnRight();
    this.configureInterfaceForCurrentLocation();
  }
  turnLeft(): void {
    if (this.currentGame) this.currentGame.turnLeft();
    this.configureInterfaceForCurrentLocation();
  }

  private configureInterfaceForCurrentLocation() : void {
    this.setMazeImages();
    if (this.currentGame) {
      this.showForwardButton = this.currentGame.hasForwardPath();
      this.locationDescription = this.currentGame.getFlavorText();
    }
  }
}
