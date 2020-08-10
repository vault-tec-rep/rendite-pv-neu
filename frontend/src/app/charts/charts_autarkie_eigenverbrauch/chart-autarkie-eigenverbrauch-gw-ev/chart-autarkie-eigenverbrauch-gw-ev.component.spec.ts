import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAutarkieEigenverbrauchGwEvComponent } from './chart-autarkie-eigenverbrauch-gw-ev.component';

describe('ChartAutarkieEigenverbrauchGwEvComponent', () => {
  let component: ChartAutarkieEigenverbrauchGwEvComponent;
  let fixture: ComponentFixture<ChartAutarkieEigenverbrauchGwEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAutarkieEigenverbrauchGwEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAutarkieEigenverbrauchGwEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
