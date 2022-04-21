import { Component, Input, OnInit } from '@angular/core';
import { MazeState } from '../maze-model/maze-state';

@Component({
  selector: 'app-exit-interface',
  templateUrl: './exit-interface.component.html',
  styleUrls: ['./exit-interface.component.scss']
})
export class ExitInterfaceComponent implements OnInit {

  @Input() currentGame?: MazeState;

  constructor() { }

  ngOnInit(): void {
  }

}
