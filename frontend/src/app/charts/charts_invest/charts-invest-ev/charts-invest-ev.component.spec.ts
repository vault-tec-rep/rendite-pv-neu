import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsInvestEvComponent } from './charts-invest-ev.component';

describe('ChartsInvestEvComponent', () => {
  let component: ChartsInvestEvComponent;
  let fixture: ComponentFixture<ChartsInvestEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsInvestEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsInvestEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
