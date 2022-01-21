import { Component, OnInit, Input } from '@angular/core';
import { MazeScreen } from '../MazeScreen';
import { MazeState } from '../MazeState';

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
      this.currentGame.currentScreen = MazeScreen.Interface;
    }
  }

}
