import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRenditeEvComponent } from './chart-rendite-ev.component';

describe('ChartRenditeEvComponent', () => {
  let component: ChartRenditeEvComponent;
  let fixture: ComponentFixture<ChartRenditeEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRenditeEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRenditeEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
