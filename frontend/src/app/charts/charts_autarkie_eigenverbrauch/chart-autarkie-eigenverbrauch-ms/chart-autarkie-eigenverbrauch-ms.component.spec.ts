import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAutarkieEigenverbrauchMsComponent } from './chart-autarkie-eigenverbrauch-ms.component';

describe('ChartAutarkieEigenverbrauchMsComponent', () => {
  let component: ChartAutarkieEigenverbrauchMsComponent;
  let fixture: ComponentFixture<ChartAutarkieEigenverbrauchMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAutarkieEigenverbrauchMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAutarkieEigenverbrauchMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
