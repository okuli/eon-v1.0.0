import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectCallComponent } from './connect-call.component';

xdescribe('ConnectCallComponent', () => {
  let component: ConnectCallComponent;
  let fixture: ComponentFixture<ConnectCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
