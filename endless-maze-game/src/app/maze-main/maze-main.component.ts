import { Component, OnInit } from '@angular/core';
import { MazeScreen } from '../MazeScreen';
import { MazeState } from '../MazeState';
import { MazeStructure } from '../MazeStructure';

@Component({
  selector: 'app-maze-main',
  templateUrl: './maze-main.component.html',
  styleUrls: ['./maze-main.component.scss']
})
export class MazeMainComponent implements OnInit {

  mazeStructure: MazeStructure = {
    dimensions: [5, 5]
  };
  currentGame: MazeState = {
    currentScreen: MazeScreen.Intro,
    maze: this.mazeStructure
  };

  MazeScreen = MazeScreen;

  constructor() {   }

  ngOnInit(): void {
  }

}
