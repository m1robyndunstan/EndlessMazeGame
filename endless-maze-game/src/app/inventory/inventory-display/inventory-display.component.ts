import { Component, Input, OnInit } from '@angular/core';
import { InventoryItems } from '../inventory-items';

@Component({
  selector: 'app-inventory-display',
  templateUrl: './inventory-display.component.html',
  styleUrls: ['./inventory-display.component.scss']
})
export class InventoryDisplayComponent implements OnInit {

  @Input() inventory?: InventoryItems[];

  canScrollBack: boolean;
  canScrollForward: boolean;
  startingIndex: number;

  constructor() {
    this.canScrollBack = false;
    this.canScrollForward = false;
    this.startingIndex = 0;
  }

  ngOnInit(): void {
  }

}
