import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRenditeGwEvComponent } from './chart-rendite-gw-ev.component';

describe('ChartRenditeGwEvComponent', () => {
  let component: ChartRenditeGwEvComponent;
  let fixture: ComponentFixture<ChartRenditeGwEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRenditeGwEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRenditeGwEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
