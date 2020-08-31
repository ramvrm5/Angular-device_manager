import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesviewComponent } from './issuesview.component';

describe('IssuesviewComponent', () => {
  let component: IssuesviewComponent;
  let fixture: ComponentFixture<IssuesviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
