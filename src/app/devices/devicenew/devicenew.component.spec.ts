import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicenewComponent } from './devicenew.component';

describe('DevicenewComponent', () => {
  let component: DevicenewComponent;
  let fixture: ComponentFixture<DevicenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
