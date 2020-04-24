import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineComponent } from './offline.component';
import { TranslateModule } from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ClientOpenGuard} from '../../riot/lol/client/client-open.guard';
import {RouterTestingModule} from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: OfflineComponent;
  let fixture: ComponentFixture<OfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfflineComponent],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [OfflineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
