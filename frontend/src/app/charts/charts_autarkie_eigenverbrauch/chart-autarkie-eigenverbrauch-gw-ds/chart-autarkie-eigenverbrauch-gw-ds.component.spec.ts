import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAutarkieEigenverbrauchGwDsComponent } from './chart-autarkie-eigenverbrauch-gw-ds.component';

describe('ChartAutarkieEigenverbrauchGwDsComponent', () => {
  let component: ChartAutarkieEigenverbrauchGwDsComponent;
  let fixture: ComponentFixture<ChartAutarkieEigenverbrauchGwDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAutarkieEigenverbrauchGwDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAutarkieEigenverbrauchGwDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
