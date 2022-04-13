import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathImageComponent } from './path-image.component';

describe('PathImageComponent', () => {
  let component: PathImageComponent;
  let fixture: ComponentFixture<PathImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
