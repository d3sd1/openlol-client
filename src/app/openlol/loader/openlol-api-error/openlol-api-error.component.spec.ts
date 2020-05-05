import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenlolApiErrorComponent} from './openlol-api-error.component';

describe('OpenlolApiErrorComponent', () => {
  let component: OpenlolApiErrorComponent;
  let fixture: ComponentFixture<OpenlolApiErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpenlolApiErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenlolApiErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
