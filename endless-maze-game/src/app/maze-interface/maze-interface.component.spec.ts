import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeInterfaceComponent } from './maze-interface.component';

describe('MazeInterfaceComponent', () => {
  let component: MazeInterfaceComponent;
  let fixture: ComponentFixture<MazeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
