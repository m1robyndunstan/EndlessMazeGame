import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { MazeDirection } from 'src/app/maze-model/maze-direction';
import { MazeSpecial } from 'src/app/maze-model/maze-special';
import { MazeState } from 'src/app/maze-model/maze-state';
import { CeilingType } from '../path-image/ceiling-type';
import { DirectionType } from '../path-image/direction-type';
import { FloorType } from '../path-image/floor-type';
import { WallType } from '../path-image/wall-type';

@Component({
  selector: 'app-path-interface',
  templateUrl: './path-interface.component.html',
  styleUrls: ['./path-interface.component.scss']
})
export class PathInterfaceComponent implements OnInit {

  @Input() currentGame?: MazeState;

  playerFacingDir?: string;
  locationDescription?: string
  showForwardButton: boolean;
  showActionButton: boolean;
  actionButtonText?: string;

  imageCeilingType: CeilingType;
  imageFloorType: FloorType;
  imageWallType: WallType;
  imageDirectionLeft: DirectionType;
  imageDirectionCenter: DirectionType;
  imageDirectionRight : DirectionType;
  imageDirectionBack: DirectionType;
  imageSpecialType : MazeSpecial;

  constructor() {
    this.showForwardButton = false;
    this.showActionButton = false;
    this.imageCeilingType = CeilingType.Sky;
    this.imageFloorType = FloorType.Grass;
    this.imageWallType = WallType.Bush;
    this.imageDirectionLeft = DirectionType.Wall;
    this.imageDirectionCenter = DirectionType.Wall;
    this.imageDirectionRight = DirectionType.Wall;
    this.imageDirectionBack = DirectionType.Wall;
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
      this.imageCeilingType = CeilingType.Sky;
      this.imageWallType = WallType.Bush;

      switch (this.currentGame.getSpecialType()) {
        case MazeSpecial.Exit :
          this.imageSpecialType = MazeSpecial.Exit;
          this.imageFloorType = FloorType.Stone;
          break;
        case MazeSpecial.None:
        case MazeSpecial.Start:
        default:
          this.imageSpecialType = MazeSpecial.None;
          this.imageFloorType = FloorType.Grass;
          break;
      }

      this.imageDirectionLeft = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialLeft() ? DirectionType.Special : 
        this.currentGame.hasLeftPath() ? DirectionType.Path : DirectionType.Wall;
      this.imageDirectionCenter = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialForward() ? DirectionType.Special : 
        this.currentGame.hasForwardPath() ? DirectionType.Path : DirectionType.Wall;
      this.imageDirectionRight = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialRight() ? DirectionType.Special : 
        this.currentGame.hasRightPath() ? DirectionType.Path : DirectionType.Wall;
      this.imageDirectionBack = this.imageSpecialType != MazeSpecial.None && this.currentGame.isSpecialBack() ? DirectionType.Special : 
        this.currentGame.hasBackPath() ? DirectionType.Path : DirectionType.Wall;
    }
  }

  doTravel(direction: number): void {
    switch(direction) {
      case 0:
        this.moveForward();
        break;
      case 1:
        this.turnRight();
        this.moveForward();
        break;
      case 2:
        this.turnAround();
        this.moveForward();
        break;
      case 3:
        this.turnLeft();
        this.moveForward();
        break;
      case -1:
        this.doAction();
        break;
      default:
        break;
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
  turnAround(): void {
    if (this.currentGame) this.currentGame.turnAround();
    this.configureInterfaceForCurrentLocation();
  }

  doAction(): void {
    if (this.currentGame) this.currentGame.doAction();
  }

  private configureInterfaceForCurrentLocation() : void {
    this.setMazeImageVariables();
    if (this.currentGame) {
      this.showForwardButton = this.currentGame.hasForwardPath();
      this.locationDescription = this.currentGame.getFlavorText();

      this.showActionButton = this.currentGame.hasAction();
      this.actionButtonText = this.currentGame.getActionText();
    }
  }
}
