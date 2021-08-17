import { Component, OnInit } from '@angular/core';
import { MazeScreen } from '../MazeScreen';
import { MazeState } from '../MazeState';

@Component({
  selector: 'app-maze-main',
  templateUrl: './maze-main.component.html',
  styleUrls: ['./maze-main.component.scss']
})
export class MazeMainComponent implements OnInit {

  currentGame: MazeState = {
    currentScreen: MazeScreen.Intro
  };

  MazeScreen = MazeScreen;

  constructor() {   }

  ngOnInit(): void {
  }

}
