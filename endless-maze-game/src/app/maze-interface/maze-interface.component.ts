import { Component, OnInit, Input } from '@angular/core';
import { MazeState } from '../MazeState';
import { MazeDirection } from '../MazeDirection';
import { MazeSpecial } from '../MazeSpecial';
import { MazeImageCeilingType, MazeImageFloorType, MazeImageWallType, MazeImageDirectionType } from '../maze-image/maze-image.component';

@Component({
  selector: 'app-maze-interface',
  templateUrl: './maze-interface.component.html',
  styleUrls: ['./maze-interface.component.scss']
})
export class MazeInterfaceComponent implements OnInit {

  @Input() currentGame?: MazeState;

  playerFacingDir?: string;
  locationDescription?: string
  showForwardButton: boolean;

  imageCeilingType: MazeImageCeilingType;
  imageFloorType: MazeImageFloorType;
  imageWallType: MazeImageWallType;
  imageDirectionLeft: MazeImageDirectionType;
  imageDirectionCenter: MazeImageDirectionType;
  imageDirectionRight : MazeImageDirectionType;
  imageSpecialType : MazeSpecial;

  constructor() {
    this.showForwardButton = false;
    this.imageCeilingType = MazeImageCeilingType.Sky;
    this.imageFloorType = MazeImageFloorType.Grass;
    this.imageWallType = MazeImageWallType.Bush;
    this.imageDirectionLeft = MazeImageDirectionType.Wall;
    this.imageDirectionCenter = MazeImageDirectionType.Wall;
    this.imageDirectionRight = MazeImageDirectionType.Wall;
    this.imageSpecialType = MazeSpecial.None;
   }

  ngOnInit(): void {
    if (this.currentGame) {
      this.playerFacingDir = MazeDirection[this.currentGame.playerDirection ? this.currentGame.playerDirection : MazeDirection.North];
      
      this.configureInterfaceForCurrentLocation();
    }
  }

  setMazeImageVariables(): void {
    if (this.currentGame) {
      this.imageCeilingType = MazeImageCeilingType.Sky;
      this.imageWallType = MazeImageWallType.Bush;

      switch (this.currentGame.getSpecialType()) {
        case MazeSpecial.Exit :
          this.imageSpecialType = MazeSpecial.Exit;
          this.imageFloorType = MazeImageFloorType.Stone;
          break;
        case MazeSpecial.None:
        case MazeSpecial.Start:
        default:
          this.imageSpecialType = MazeSpecial.None;
          this.imageFloorType = MazeImageFloorType.Grass;
          break;
      }

      this.imageDirectionLeft = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialLeft() ? MazeImageDirectionType.Special : 
        this.currentGame.hasLeftPath() ? MazeImageDirectionType.Path : MazeImageDirectionType.Wall;
      this.imageDirectionCenter = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialForward() ? MazeImageDirectionType.Special : 
        this.currentGame.hasForwardPath() ? MazeImageDirectionType.Path : MazeImageDirectionType.Wall;
      this.imageDirectionRight = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialRight() ? MazeImageDirectionType.Special : 
        this.currentGame.hasRightPath() ? MazeImageDirectionType.Path : MazeImageDirectionType.Wall;
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
    this.setMazeImageVariables();
    if (this.currentGame) {
      this.showForwardButton = this.currentGame.hasForwardPath();
      this.locationDescription = this.currentGame.getFlavorText();
    }
  }
}
