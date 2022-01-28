import { Component, OnInit, Input } from '@angular/core';
import { MazeState } from '../MazeState';
import { MazeDirection } from '../MazeDirection';

@Component({
  selector: 'app-maze-interface',
  templateUrl: './maze-interface.component.html',
  styleUrls: ['./maze-interface.component.scss']
})
export class MazeInterfaceComponent implements OnInit {

  @Input() currentGame?: MazeState;

  playerStartDir?: string;

  constructor() { }

  ngOnInit(): void {
    if (this.currentGame?.playerDirection) this.playerStartDir = MazeDirection[this.currentGame?.playerDirection];
  }

}
