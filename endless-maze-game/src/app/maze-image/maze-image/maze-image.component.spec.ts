import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeImageComponent } from './maze-image.component';

describe('MazeImageComponent', () => {
  let component: MazeImageComponent;
  let fixture: ComponentFixture<MazeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
