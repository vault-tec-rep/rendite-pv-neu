import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRenditeMsComponent } from './chart-rendite-ms.component';

describe('ChartRenditeMsComponent', () => {
  let component: ChartRenditeMsComponent;
  let fixture: ComponentFixture<ChartRenditeMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRenditeMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRenditeMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
