import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MazeSpecial } from 'src/app/MazeSpecial';
import { MazeImageCeilingType } from '../maze-image-ceiling-type';
import { MazeImageDirectionType } from '../maze-image-direction-type';
import { MazeImageFloorType } from '../maze-image-floor-type';
import { MazeImageUrl } from '../maze-image-url';
import { MazeImageWallType } from '../maze-image-wall-type';

@Component({
  selector: 'app-maze-image',
  templateUrl: './maze-image.component.html',
  styleUrls: ['./maze-image.component.scss']
})
export class MazeImageComponent implements OnInit {

  @Input() ceilingType?: MazeImageCeilingType;
  @Input() floorType?: MazeImageFloorType;
  @Input() wallType?: MazeImageWallType;
  @Input() leftImage?: MazeImageDirectionType;
  @Input() centerImage?: MazeImageDirectionType;
  @Input() rightImage?: MazeImageDirectionType;
  @Input() specialType?: MazeSpecial;

  imgCeilingUrl?: MazeImageUrl;
  imgFloorUrl?: MazeImageUrl;
  imgLeftBackgroundUrl?: MazeImageUrl;
  imgCenterBackgroundUrl?: MazeImageUrl;
  imgRightBackgroundUrl?: MazeImageUrl;
  imgLeftOverlayUrl?: MazeImageUrl;
  imgCenterOverlayUrl?: MazeImageUrl;
  imgRightOverlayUrl?: MazeImageUrl;
  
  constructor() { }

  ngOnInit(): void {
    this.setImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setImages();
  }

  private setImages() {
    switch(this.ceilingType) {
      case MazeImageCeilingType.Sky:
        this.imgCeilingUrl = MazeImageUrl.SkyCeiling;
        break;
      default:
        this.imgCeilingUrl = MazeImageUrl.SkyCeiling;
        break;
    }

    switch(this.floorType) {
      case MazeImageFloorType.Grass:
        this.imgFloorUrl = MazeImageUrl.GrassFloor;
        break;
      case MazeImageFloorType.Stone:
        this.imgFloorUrl = MazeImageUrl.StoneFloor;
        break;
      default:
        this.imgFloorUrl = MazeImageUrl.GrassFloor;
        break;
    }

    switch(this.wallType) {
      case MazeImageWallType.Bush:
        this.imgLeftBackgroundUrl = this.leftImage == MazeImageDirectionType.Path ? MazeImageUrl.BushPathLeft : MazeImageUrl.BushWallLeft;
        this.imgCenterBackgroundUrl = this.centerImage == MazeImageDirectionType.Path ? MazeImageUrl.BushPathCenter : MazeImageUrl.BushWallCenter;
        this.imgRightBackgroundUrl = this.rightImage == MazeImageDirectionType.Path ? MazeImageUrl.BushPathRight : MazeImageUrl.BushWallRight;
        break;
      default:
        this.imgLeftBackgroundUrl = this.leftImage == MazeImageDirectionType.Path ? MazeImageUrl.BushPathLeft : MazeImageUrl.BushWallLeft;
        this.imgCenterBackgroundUrl = this.centerImage == MazeImageDirectionType.Path ? MazeImageUrl.BushPathCenter : MazeImageUrl.BushWallCenter;
        this.imgRightBackgroundUrl = this.rightImage == MazeImageDirectionType.Path ? MazeImageUrl.BushPathRight : MazeImageUrl.BushWallRight;
        break;
    }

    switch(this.leftImage) {
      case MazeImageDirectionType.Path:
        this.imgLeftOverlayUrl = MazeImageUrl.ShadowPathLeft;
        break;
      case MazeImageDirectionType.Special:
        switch(this.specialType) {
          case MazeSpecial.Exit:
            this.imgLeftOverlayUrl = MazeImageUrl.ExitLeft;
            break;
          default:
            this.imgLeftOverlayUrl = undefined;
        }
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
        this.imgCenterOverlayUrl = MazeImageUrl.ShadowPathCenter;
        break;
      case MazeImageDirectionType.Special:
        switch(this.specialType) {
          case MazeSpecial.Exit:
            this.imgCenterOverlayUrl = MazeImageUrl.ExitCenter;
            break;
          default:
            this.imgCenterOverlayUrl = undefined;
        }
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
        this.imgRightOverlayUrl = MazeImageUrl.ShadowPathRight;
        break;
      case MazeImageDirectionType.Special:
        switch(this.specialType) {
          case MazeSpecial.Exit:
            this.imgRightOverlayUrl = MazeImageUrl.ExitRight;
            break;
          default:
            this.imgRightOverlayUrl = undefined;
        }
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
