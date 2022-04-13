import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathInterfaceComponent } from './path-interface.component';

describe('PathInterfaceComponent', () => {
  let component: PathInterfaceComponent;
  let fixture: ComponentFixture<PathInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
