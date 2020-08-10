import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRenditeGwDsComponent } from './chart-rendite-gw-ds.component';

describe('ChartRenditeGwDsComponent', () => {
  let component: ChartRenditeGwDsComponent;
  let fixture: ComponentFixture<ChartRenditeGwDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRenditeGwDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRenditeGwDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
