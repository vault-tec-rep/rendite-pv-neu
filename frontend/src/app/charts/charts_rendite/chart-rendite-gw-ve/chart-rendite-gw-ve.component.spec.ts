import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRenditeGwVeComponent } from './chart-rendite-gw-ve.component';

describe('ChartRenditeGwVeComponent', () => {
  let component: ChartRenditeGwVeComponent;
  let fixture: ComponentFixture<ChartRenditeGwVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRenditeGwVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRenditeGwVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
