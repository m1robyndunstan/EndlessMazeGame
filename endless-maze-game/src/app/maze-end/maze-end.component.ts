import { Component, Input, OnInit } from '@angular/core';
import { MazeScreen } from '../maze-main/maze-screen';
import { MazeState } from '../maze-model/maze-state';

@Component({
  selector: 'app-maze-end',
  templateUrl: './maze-end.component.html',
  styleUrls: ['./maze-end.component.scss']
})
export class MazeEndComponent implements OnInit {

  @Input() currentGame?: MazeState;

  constructor() { }

  ngOnInit(): void {
  }

  newGame(): void {
    if (this.currentGame) {
      this.currentGame.currentScreen = MazeScreen.Intro;
      this.currentGame.newMaze();
    }
  }

}
