import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MazeMainComponent } from './maze-main/maze-main.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MazeIntroComponent } from './maze-intro/maze-intro.component';
import { PathInterfaceModule } from './path-interface/path-interface.module';
import { ExitInterfaceComponent } from './exit-interface/exit-interface.component';
import { MazeEndComponent } from './maze-end/maze-end.component';
import { MapDisplayModule } from './map-display/map-display.module';
import { InterfaceTaskbarModule } from './interface-taskbar/interface-taskbar.module';

@NgModule({
  declarations: [
    AppComponent,
    MazeMainComponent,
    PageFooterComponent,
    PageHeaderComponent,
    MazeIntroComponent,
    ExitInterfaceComponent,
    MazeEndComponent
  ],
  imports: [
    BrowserModule,
    PathInterfaceModule,
    MapDisplayModule,
    InterfaceTaskbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
