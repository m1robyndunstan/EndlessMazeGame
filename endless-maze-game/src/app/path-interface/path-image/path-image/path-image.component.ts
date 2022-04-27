import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MazeSpecial } from 'src/app/maze-model/maze-special';
import { CeilingType } from '../ceiling-type';
import { DirectionType } from '../direction-type';
import { FloorType } from '../floor-type';
import { ImageUrl } from '../image-url';
import { WallType } from '../wall-type';

@Component({
  selector: 'app-path-image',
  templateUrl: './path-image.component.html',
  styleUrls: ['./path-image.component.scss']
})
export class PathImageComponent implements OnInit {

  @Input() ceilingType?: CeilingType;
  @Input() floorType?: FloorType;
  @Input() wallType?: WallType;
  @Input() leftImage?: DirectionType;
  @Input() centerImage?: DirectionType;
  @Input() rightImage?: DirectionType;
  @Input() backImage?: DirectionType;
  @Input() specialType?: MazeSpecial;

  @Output() travelDirection = new EventEmitter<number>();

  imgCeilingUrl?: ImageUrl;
  imgFloorUrl?: ImageUrl;
  imgLeftBackgroundUrl?: ImageUrl;
  imgCenterBackgroundUrl?: ImageUrl;
  imgRightBackgroundUrl?: ImageUrl;
  imgLeftOverlayUrl?: ImageUrl;
  imgCenterOverlayUrl?: ImageUrl;
  imgRightOverlayUrl?: ImageUrl;
  
  constructor() {  }

  ngOnInit(): void {
    this.setImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setImages();
  }

  getCenterCursor(): string {
    switch(this.centerImage) {
      case DirectionType.Path:
        return "cursor-forward";
      case DirectionType.Special:
        return "cursor-in";
      default:
        return "cursor-default";
    }
  }

  getLeftCursor(): string {
    switch(this.leftImage) {
      case DirectionType.Path:
        return "cursor-left";
      case DirectionType.Special:
        return "cursor-in";
      default:
        return "cursor-default";
    }
  }

  getRightCursor(): string {
    switch(this.rightImage) {
      case DirectionType.Path:
        return "cursor-right";
      case DirectionType.Special:
        return "cursor-in";
      default:
        return "cursor-default";
    }
  }

  getBackCursor(): string {
    switch(this.backImage) {
      case DirectionType.Path:
        return "cursor-back";
      case DirectionType.Special:
        return "cursor-in";
      default:
        return "cursor-default";
    }
  }

  

  goForward(): void {
    switch(this.centerImage) {
      case DirectionType.Path:
        this.travelDirection.emit(0);
        break;
      case DirectionType.Special:
        this.travelDirection.emit(-1);
        break;
      default:
        break;
    }
  }

  goLeft(): void {
    switch(this.leftImage) {
      case DirectionType.Path:
        this.travelDirection.emit(3);
        break;
      case DirectionType.Special:
        this.travelDirection.emit(-1);
        break;
      default:
        break;
    }
  }

  goRight(): void {
    switch(this.rightImage) {
      case DirectionType.Path:
        this.travelDirection.emit(1);
        break;
      case DirectionType.Special:
        this.travelDirection.emit(-1);
        break;
      default:
        break;
    }
  }

  goBack(): void {
    switch(this.backImage) {
      case DirectionType.Path:
        this.travelDirection.emit(2);
        break;
      case DirectionType.Special:
        this.travelDirection.emit(-1);
        break;
      default:
        break;
    }
  }

  private setImages() {
    switch(this.ceilingType) {
      case CeilingType.Sky:
        this.imgCeilingUrl = ImageUrl.SkyCeiling;
        break;
      default:
        this.imgCeilingUrl = ImageUrl.SkyCeiling;
        break;
    }

    switch(this.floorType) {
      case FloorType.Grass:
        this.imgFloorUrl = ImageUrl.GrassFloor;
        break;
      case FloorType.Stone:
        this.imgFloorUrl = ImageUrl.StoneFloor;
        break;
      default:
        this.imgFloorUrl = ImageUrl.GrassFloor;
        break;
    }

    switch(this.wallType) {
      case WallType.Bush:
        this.imgLeftBackgroundUrl = this.leftImage == DirectionType.Path ? ImageUrl.BushPathLeft : ImageUrl.BushWallLeft;
        this.imgCenterBackgroundUrl = this.centerImage == DirectionType.Path ? ImageUrl.BushPathCenter : ImageUrl.BushWallCenter;
        this.imgRightBackgroundUrl = this.rightImage == DirectionType.Path ? ImageUrl.BushPathRight : ImageUrl.BushWallRight;
        break;
      default:
        this.imgLeftBackgroundUrl = this.leftImage == DirectionType.Path ? ImageUrl.BushPathLeft : ImageUrl.BushWallLeft;
        this.imgCenterBackgroundUrl = this.centerImage == DirectionType.Path ? ImageUrl.BushPathCenter : ImageUrl.BushWallCenter;
        this.imgRightBackgroundUrl = this.rightImage == DirectionType.Path ? ImageUrl.BushPathRight : ImageUrl.BushWallRight;
        break;
    }

    switch(this.leftImage) {
      case DirectionType.Path:
        this.imgLeftOverlayUrl = ImageUrl.ShadowPathLeft;
        break;
      case DirectionType.Special:
        switch(this.specialType) {
          case MazeSpecial.Exit:
            this.imgLeftOverlayUrl = ImageUrl.ExitLeft;
            break;
          default:
            this.imgLeftOverlayUrl = undefined;
        }
        break;
      case DirectionType.Wall:
        this.imgLeftOverlayUrl = undefined;
        break;
      default:
        this.imgLeftOverlayUrl = undefined;
        break;
    }

    switch(this.centerImage) {
      case DirectionType.Path:
        this.imgCenterOverlayUrl = ImageUrl.ShadowPathCenter;
        break;
      case DirectionType.Special:
        switch(this.specialType) {
          case MazeSpecial.Exit:
            this.imgCenterOverlayUrl = ImageUrl.ExitCenter;
            break;
          default:
            this.imgCenterOverlayUrl = undefined;
        }
        break;
      case DirectionType.Wall:
        this.imgCenterOverlayUrl = undefined;
        break;
      default:
        this.imgCenterOverlayUrl = undefined;
        break;
    }

    switch(this.rightImage) {
      case DirectionType.Path:
        this.imgRightOverlayUrl = ImageUrl.ShadowPathRight;
        break;
      case DirectionType.Special:
        switch(this.specialType) {
          case MazeSpecial.Exit:
            this.imgRightOverlayUrl = ImageUrl.ExitRight;
            break;
          default:
            this.imgRightOverlayUrl = undefined;
        }
        break;
      case DirectionType.Wall:
        this.imgRightOverlayUrl = undefined;
        break;
      default:
        this.imgRightOverlayUrl = undefined;
        break;
    }
  }
}
