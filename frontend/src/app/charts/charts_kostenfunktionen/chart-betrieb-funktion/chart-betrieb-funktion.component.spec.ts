import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBetriebFunktionComponent } from './chart-betrieb-funktion.component';

describe('ChartBetriebFunktionComponent', () => {
  let component: ChartBetriebFunktionComponent;
  let fixture: ComponentFixture<ChartBetriebFunktionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBetriebFunktionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBetriebFunktionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
