import { Component, Input, OnInit } from '@angular/core';
import { MazeState } from 'src/app/maze-model/maze-state';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit {

  @Input() currentGame?: MazeState;

  constructor() { }

  ngOnInit(): void {
  }

}
