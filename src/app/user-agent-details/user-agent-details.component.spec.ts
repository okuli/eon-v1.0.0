import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgentDetailsComponent } from './user-agent-details.component';

xdescribe('UserAgentDetailsComponent', () => {
  let component: UserAgentDetailsComponent;
  let fixture: ComponentFixture<UserAgentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
