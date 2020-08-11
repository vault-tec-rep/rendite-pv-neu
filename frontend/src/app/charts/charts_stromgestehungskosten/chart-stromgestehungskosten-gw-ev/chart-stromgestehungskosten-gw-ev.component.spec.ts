import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStromgestehungskostenGwEvComponent } from './chart-stromgestehungskosten-gw-ev.component';

describe('ChartStromgestehungskostenGwEvComponent', () => {
  let component: ChartStromgestehungskostenGwEvComponent;
  let fixture: ComponentFixture<ChartStromgestehungskostenGwEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStromgestehungskostenGwEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStromgestehungskostenGwEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
