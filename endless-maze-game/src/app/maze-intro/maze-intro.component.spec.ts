import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeIntroComponent } from './maze-intro.component';

describe('MazeIntroComponent', () => {
  let component: MazeIntroComponent;
  let fixture: ComponentFixture<MazeIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
