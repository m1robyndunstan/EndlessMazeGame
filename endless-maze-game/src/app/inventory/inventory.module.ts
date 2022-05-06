import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDisplayComponent } from './inventory-display/inventory-display.component';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';



@NgModule({
  declarations: [
    InventoryDisplayComponent,
    InventoryItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InventoryDisplayComponent
  ]
})
export class InventoryModule { }
