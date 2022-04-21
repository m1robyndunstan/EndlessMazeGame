import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitInterfaceComponent } from './exit-interface.component';

describe('ExitInterfaceComponent', () => {
  let component: ExitInterfaceComponent;
  let fixture: ComponentFixture<ExitInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
