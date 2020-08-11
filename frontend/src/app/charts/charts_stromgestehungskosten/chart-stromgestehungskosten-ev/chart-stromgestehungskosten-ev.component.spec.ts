import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStromgestehungskostenEvComponent } from './chart-stromgestehungskosten-ev.component';

describe('ChartStromgestehungskostenEvComponent', () => {
  let component: ChartStromgestehungskostenEvComponent;
  let fixture: ComponentFixture<ChartStromgestehungskostenEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStromgestehungskostenEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStromgestehungskostenEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
