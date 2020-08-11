import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStromgestehungskostenGwDsComponent } from './chart-stromgestehungskosten-gw-ds.component';

describe('ChartStromgestehungskostenGwDsComponent', () => {
  let component: ChartStromgestehungskostenGwDsComponent;
  let fixture: ComponentFixture<ChartStromgestehungskostenGwDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStromgestehungskostenGwDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStromgestehungskostenGwDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
