import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicetypesComponent } from './devicetypes.component';

describe('DevicetypesComponent', () => {
  let component: DevicetypesComponent;
  let fixture: ComponentFixture<DevicetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
