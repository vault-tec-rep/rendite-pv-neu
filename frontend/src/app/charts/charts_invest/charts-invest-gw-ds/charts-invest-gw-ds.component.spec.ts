import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsInvestGwDsComponent } from './charts-invest-gw-ds.component';

describe('ChartsInvestGwDsComponent', () => {
  let component: ChartsInvestGwDsComponent;
  let fixture: ComponentFixture<ChartsInvestGwDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsInvestGwDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsInvestGwDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
