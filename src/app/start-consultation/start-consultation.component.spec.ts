import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartConsultationComponent } from './start-consultation.component';

xdescribe('StartConsultationComponent', () => {
  let component: StartConsultationComponent;
  let fixture: ComponentFixture<StartConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
