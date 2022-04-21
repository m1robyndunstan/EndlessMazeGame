import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeEndComponent } from './maze-end.component';

describe('MazeEndComponent', () => {
  let component: MazeEndComponent;
  let fixture: ComponentFixture<MazeEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
