import { Component, OnInit, Input } from '@angular/core';
import { MazeScreen } from '../maze-main/maze-screen';
import { MazeState } from '../maze-model/maze-state';

@Component({
  selector: 'app-maze-intro',
  templateUrl: './maze-intro.component.html',
  styleUrls: ['./maze-intro.component.scss']
})
export class MazeIntroComponent implements OnInit {

  @Input() currentGame?: MazeState;

  constructor() { }

  ngOnInit(): void {
  }

  enterMaze(): void {
    if (this.currentGame) {
      this.currentGame.startMaze();
      this.currentGame.currentScreen = MazeScreen.Interface;
    }
  }

}
