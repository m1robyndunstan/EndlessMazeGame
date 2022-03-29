import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MazeImage } from '../MazeImage';
import { MazeSpecial } from '../MazeSpecial';

@Component({
  selector: 'app-maze-image',
  templateUrl: './maze-image.component.html',
  styleUrls: ['./maze-image.component.scss']
})
export class MazeImageComponent implements OnInit {

  @Input() ceilingType: MazeImageCeilingType;
  @Input() floorType: MazeImageFloorType;
  @Input() wallType: MazeImageWallType;
  @Input() leftImage: MazeImageDirectionType;
  @Input() centerImage: MazeImageDirectionType;
  @Input() rightImage: MazeImageDirectionType;
  @Input() specialType: MazeSpecial;

  imgCeilingUrl: MazeImage;
  imgFloorUrl: MazeImage;
  imgLeftBackgroundUrl: MazeImage;
  imgCenterBackgroundUrl: MazeImage;
  imgRightBackgroundUrl: MazeImage;
  imgLeftOverlayUrl?: MazeImage;
  imgCenterOverlayUrl?: MazeImage;
  imgRightOverlayUrl?: MazeImage;

  constructor() {
    this.ceilingType = MazeImageCeilingType.Sky;
    this.floorType = MazeImageFloorType.Grass;
    this.wallType = MazeImageWallType.Bush;
    this.leftImage = MazeImageDirectionType.Wall;
    this.centerImage = MazeImageDirectionType.Wall;
    this.rightImage = MazeImageDirectionType.Wall;
    this.specialType = MazeSpecial.None;

    this.imgCeilingUrl = MazeImage.SkyCeiling;
    this.imgFloorUrl = MazeImage.GrassFloor;
    this.imgLeftBackgroundUrl = MazeImage.BushWallLeft;
    this.imgCenterBackgroundUrl = MazeImage.BushWallCenter;
    this.imgRightBackgroundUrl = MazeImage.BushWallRight;
    this.imgLeftOverlayUrl = undefined;
    this.imgCenterOverlayUrl = undefined;
    this.imgRightOverlayUrl = undefined;
   }

  ngOnInit(): void {
    this.setImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setImages();
  }

  private setImages() {
    switch(this.ceilingType) {
      case MazeImageCeilingType.Sky:
        this.imgCeilingUrl = MazeImage.SkyCeiling;
        break;
      default:
        this.imgCeilingUrl = MazeImage.SkyCeiling;
        break;
    }

    switch(this.floorType) {
      case MazeImageFloorType.Grass:
        this.imgFloorUrl = MazeImage.GrassFloor;
        break;
      case MazeImageFloorType.Stone:
        this.imgFloorUrl = MazeImage.StoneFloor;
        break;
      default:
        this.imgFloorUrl = MazeImage.GrassFloor;
        break;
    }

    switch(this.wallType) {
      case MazeImageWallType.Bush:
        this.imgLeftBackgroundUrl = this.leftImage == MazeImageDirectionType.Path ? MazeImage.BushPathLeft : MazeImage.BushWallLeft;
        this.imgCenterBackgroundUrl = this.centerImage == MazeImageDirectionType.Path ? MazeImage.BushPathCenter : MazeImage.BushWallCenter;
        this.imgRightBackgroundUrl = this.rightImage == MazeImageDirectionType.Path ? MazeImage.BushPathRight : MazeImage.BushWallRight;
        break;
      default:
        this.imgLeftBackgroundUrl = this.leftImage == MazeImageDirectionType.Path ? MazeImage.BushPathLeft : MazeImage.BushWallLeft;
        this.imgCenterBackgroundUrl = this.centerImage == MazeImageDirectionType.Path ? MazeImage.BushPathCenter : MazeImage.BushWallCenter;
        this.imgRightBackgroundUrl = this.rightImage == MazeImageDirectionType.Path ? MazeImage.BushPathRight : MazeImage.BushWallRight;
        break;
    }

    switch(this.leftImage) {
      case MazeImageDirectionType.Path:
        this.imgLeftOverlayUrl = MazeImage.ShadowPathLeft;
        break;
      case MazeImageDirectionType.Special:
        this.imgLeftOverlayUrl = undefined;
        break;
      case MazeImageDirectionType.Wall:
        this.imgLeftOverlayUrl = undefined;
        break;
      default:
        this.imgLeftOverlayUrl = undefined;
        break;
    }

    switch(this.centerImage) {
      case MazeImageDirectionType.Path:
        this.imgCenterOverlayUrl = MazeImage.ShadowPathCenter;
        break;
      case MazeImageDirectionType.Special:
        this.imgCenterOverlayUrl = undefined;
        break;
      case MazeImageDirectionType.Wall:
        this.imgCenterOverlayUrl = undefined;
        break;
      default:
        this.imgCenterOverlayUrl = undefined;
        break;
    }

    switch(this.rightImage) {
      case MazeImageDirectionType.Path:
        this.imgRightOverlayUrl = MazeImage.ShadowPathRight;
        break;
      case MazeImageDirectionType.Special:
        this.imgRightOverlayUrl = undefined;
        break;
      case MazeImageDirectionType.Wall:
        this.imgRightOverlayUrl = undefined;
        break;
      default:
        this.imgRightOverlayUrl = undefined;
        break;
    }
  }
}

export enum MazeImageCeilingType {
  Sky
}

export enum MazeImageFloorType {
  Grass, Stone
}
export enum MazeImageWallType {
  Bush
}
export enum MazeImageDirectionType {
  Wall, Path, Special
}
