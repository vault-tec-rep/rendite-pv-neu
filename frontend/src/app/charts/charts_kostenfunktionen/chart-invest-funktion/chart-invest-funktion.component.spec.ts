import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInvestFunktionComponent } from './chart-invest-funktion.component';

describe('ChartInvestFunktionComponent', () => {
  let component: ChartInvestFunktionComponent;
  let fixture: ComponentFixture<ChartInvestFunktionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartInvestFunktionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartInvestFunktionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
