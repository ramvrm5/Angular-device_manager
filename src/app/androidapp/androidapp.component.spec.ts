import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidappComponent } from './androidapp.component';

describe('AndroidappComponent', () => {
  let component: AndroidappComponent;
  let fixture: ComponentFixture<AndroidappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
