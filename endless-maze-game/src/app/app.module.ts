import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MazeMainComponent } from './maze-main/maze-main.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MazeIntroComponent } from './maze-intro/maze-intro.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeMainComponent,
    PageFooterComponent,
    PageHeaderComponent,
    MazeIntroComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
