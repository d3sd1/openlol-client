import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChampselectComponent} from './champselect.component';

describe('ChampselectComponent', () => {
  let component: ChampselectComponent;
  let fixture: ComponentFixture<ChampselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChampselectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
