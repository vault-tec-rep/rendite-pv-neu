import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBreakEvenErgebnisComponent } from './chart-break-even-ergebnis.component';

describe('ChartBreakEvenErgebnisComponent', () => {
  let component: ChartBreakEvenErgebnisComponent;
  let fixture: ComponentFixture<ChartBreakEvenErgebnisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBreakEvenErgebnisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBreakEvenErgebnisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
