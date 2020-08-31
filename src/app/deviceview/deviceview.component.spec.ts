import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceviewComponent } from './deviceview.component';

describe('DeviceviewComponent', () => {
  let component: DeviceviewComponent;
  let fixture: ComponentFixture<DeviceviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
