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

  // TO DO - redo this function to use new enums and variables
  setMazeImages(): void {
    if (this.currentGame) {
      if (this.currentGame.getSpecialType() == MazeSpecial.Exit) {
        this.mazeLeftImage = this.currentGame.isSpecialLeft() ? MazeImage.OldExitSpecialLeft 
          : (this.currentGame.hasLeftPath() ? MazeImage.OldExitPathLeft : MazeImage.OldExitWallLeft);
        this.mazeCenterImage = this.currentGame.isSpecialForward() ? MazeImage.OldExitSpecialCenter 
          : (this.currentGame.hasForwardPath() ? MazeImage.OldExitPathCenter : MazeImage.OldExitWallCenter);
        this.mazeRightImage = this.currentGame.isSpecialRight() ? MazeImage.OldExitSpecialRight 
          : (this.currentGame.hasRightPath() ? MazeImage.OldExitPathRight : MazeImage.OldExitWallRight);
      }
      else {
        this.mazeLeftImage = this.currentGame.hasLeftPath() ? MazeImage.OldPathLeft : MazeImage.OldWallLeft;
        this.mazeCenterImage = this.currentGame.hasForwardPath() ? MazeImage.OldPathCenter : MazeImage.OldWallCenter;
        this.mazeRightImage = this.currentGame.hasRightPath() ? MazeImage.OldPathRight : MazeImage.OldWallRight;
      }
    }
    else {
      this.mazeLeftImage = MazeImage.OldWallLeft;
      this.mazeCenterImage = MazeImage.OldWallCenter;
      this.mazeRightImage = MazeImage.OldWallRight;
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
