import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStromgestehungskostenMsComponent } from './chart-stromgestehungskosten-ms.component';

describe('ChartStromgestehungskostenMsComponent', () => {
  let component: ChartStromgestehungskostenMsComponent;
  let fixture: ComponentFixture<ChartStromgestehungskostenMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStromgestehungskostenMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStromgestehungskostenMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
