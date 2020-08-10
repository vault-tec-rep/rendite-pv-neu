import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAutarkieEigenverbrauchEvComponent } from './chart-autarkie-eigenverbrauch-ev.component';

describe('ChartAutarkieEigenverbrauchEvComponent', () => {
  let component: ChartAutarkieEigenverbrauchEvComponent;
  let fixture: ComponentFixture<ChartAutarkieEigenverbrauchEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAutarkieEigenverbrauchEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAutarkieEigenverbrauchEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
