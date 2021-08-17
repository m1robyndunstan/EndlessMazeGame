import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Endless Maze';

  constructor(private elementRef: ElementRef) {}
    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#e8eaf6';
    }
}
