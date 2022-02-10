import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAvailableAgentComponent } from './no-available-agent.component';

xdescribe('NoAvailableAgentComponent', () => {
  let component: NoAvailableAgentComponent;
  let fixture: ComponentFixture<NoAvailableAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAvailableAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAvailableAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
