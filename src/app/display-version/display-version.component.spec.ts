import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVersionComponent } from './display-version.component';

describe('DisplayVersionComponent', () => {
  let component: DisplayVersionComponent;
  let fixture: ComponentFixture<DisplayVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
