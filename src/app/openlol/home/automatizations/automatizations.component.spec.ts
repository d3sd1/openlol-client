import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutomatizationsComponent} from './automatizations.component';

describe('AutomatizationsComponent', () => {
  let component: AutomatizationsComponent;
  let fixture: ComponentFixture<AutomatizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutomatizationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
