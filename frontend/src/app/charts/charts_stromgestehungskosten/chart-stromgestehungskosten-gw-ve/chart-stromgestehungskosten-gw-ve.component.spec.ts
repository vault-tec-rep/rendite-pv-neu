import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStromgestehungskostenGwVeComponent } from './chart-stromgestehungskosten-gw-ve.component';

describe('ChartStromgestehungskostenGwVeComponent', () => {
  let component: ChartStromgestehungskostenGwVeComponent;
  let fixture: ComponentFixture<ChartStromgestehungskostenGwVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStromgestehungskostenGwVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStromgestehungskostenGwVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
