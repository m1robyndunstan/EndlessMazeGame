import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MazeBlock } from 'src/app/maze-model/maze-block';
import { MazeDirection } from 'src/app/maze-model/maze-direction';
import { MazeSpecial } from 'src/app/maze-model/maze-special';

@Component({
  selector: 'app-map-block',
  templateUrl: './map-block.component.html',
  styleUrls: ['./map-block.component.scss']
})
export class MapBlockComponent implements OnInit {

  @Input() block?: MazeBlock;
  @Input() blockX?:number;
  @Input() blockY?:number;
  @Input() playerX?: number;
  @Input() playerY?: number;
  @Input() playerDir?: MazeDirection;

  playerText: string;
  hasPlayer: boolean;
  northText: string;
  eastText: string;
  southText: string;
  westText: string;

  constructor() {
    this.playerText = "";
    this.hasPlayer = false;
    this.northText = "";
    this.eastText = "";
    this.southText = "";
    this.westText = "";
   }

  ngOnInit(): void {
    this.drawBlock();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.drawBlock();
  }

  private drawBlock(): void {
    if (this.block) {
      if (this.playerX == this.blockX && this.playerY == this.blockY) {
        this.hasPlayer = true;
        switch(this.playerDir) {
          case MazeDirection.North:
            this.playerText = "^";
            break;
          case MazeDirection.East:
            this.playerText = ">";
            break;
          case MazeDirection.West:
            this.playerText = "<";
            break;
          case MazeDirection.South:
            this.playerText = "v";
            break;
          default:
            this.playerText = "";
            break;
        }
      }
      else {
        this.hasPlayer = false;
        this.playerText = "";
      }

      this.northText = " ";
      this.eastText = " ";
      this.southText = " ";
      this.westText = " ";
      switch(this.block.specialDir) {
        case MazeDirection.North:
          this.northText = this.getSpecialText(this.block.specialDesc);
          break;
        case MazeDirection.East:
          this.eastText = this.getSpecialText(this.block.specialDesc);
          break;
        case MazeDirection.South:
          this.southText = this.getSpecialText(this.block.specialDesc);
          break;
        case MazeDirection.West:
          this.westText = this.getSpecialText(this.block.specialDesc);
          break;
        default:
          break;
      }
    }
  }

  getDirectionClass(direction: MazeDirection): string {
    if (!this.block?.paths.includes(direction)
      && (this.block?.specialDesc == MazeSpecial.None || this.block?.specialDesc == MazeSpecial.Start || this.block?.specialDir != direction)) {
        return "wall";
      }
    else if (this.block.specialDir == direction) {
      return this.getSpecialClass(this.block.specialDesc);
    }
    else {
      return "";
    }
  }

  private getSpecialText(special: MazeSpecial): string {
    switch (special) {
      case MazeSpecial.Exit:
        return "X";
      case MazeSpecial.None:
      case MazeSpecial.Start:
      default:
        return " ";
    }
  }

  private getSpecialClass(special: MazeSpecial): string {
    switch (special) {
      case MazeSpecial.Exit:
        return "special-exit";
      case MazeSpecial.None:
      case MazeSpecial.Start:
      default:
        return "";
    }
  }

  // needed to use the enum on the HTML
  public get mazeDirection(): typeof MazeDirection {
    return MazeDirection; 
  }
}
