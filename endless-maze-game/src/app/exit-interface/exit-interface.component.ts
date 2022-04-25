import { Component, Input, OnInit } from '@angular/core';
import { MazeScreen } from '../maze-main/maze-screen';
import { MazeState } from '../maze-model/maze-state';

@Component({
  selector: 'app-exit-interface',
  templateUrl: './exit-interface.component.html',
  styleUrls: ['./exit-interface.component.scss']
})
export class ExitInterfaceComponent implements OnInit {

  @Input() currentGame?: MazeState;

  description: string;
  doorIsLocked: boolean;

  defaultText: string = "The closed wooden door is inset into the hedge. There is a sign beside the door that says \"Return book here\" with a flap beneath it.";
  examineDoorText: string = "The door is well-built with no cracks between the boards. There is no keyhole to see through. The frame seems to have grown into the hedge. There is no way to go around the door or to tell what is on the other side.";
  knockText: string = "You knock firmly on the door. Nothing happens.";
  lockedText: string = "You try to open the door, but it doesn't move at all. It is clearly locked.";
  breakDownText: string = "You back up several feet and run at the door as fast as you can. You slam into the door and stagger back, stunned. The door is completely unharmed.";
  examineSlotText: string = "The flap is about a foot wide and a several inches tall. It is completely dark inside, and you can't feel anything interesting inside it. Your book will fit easily."
  returnBookText: string = "The book disappears into the slot. You hear a click from behind the door.";

  constructor() { 
    this.description = this.defaultText;
    this.doorIsLocked = true;
  }

  ngOnInit(): void {
    if (this.currentGame)
      this.doorIsLocked = this.currentGame.doorLocked;
  }

  displayText(text: string): void {
    this.description = text;
  }

  goBack(): void {
    this.description = this.defaultText;
    if (this.currentGame) this.currentGame.currentScreen = MazeScreen.Interface;
  }

  unlockDoor(): void {
    this.description = this.returnBookText;
    this.doorIsLocked = false;
    if (this.currentGame) this.currentGame.doorLocked = false;
  }

  openDoor(): void {
    if (this.currentGame) this.doorIsLocked = this.currentGame.doorLocked;

    if (this.doorIsLocked) {
      this.description = this.lockedText;
    }
    else {
      if (this.currentGame) this.currentGame.currentScreen = MazeScreen.End;
    }
  }
}
