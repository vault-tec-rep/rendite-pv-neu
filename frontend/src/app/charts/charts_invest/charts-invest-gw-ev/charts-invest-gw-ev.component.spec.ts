import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsInvestGwEvComponent } from './charts-invest-gw-ev.component';

describe('ChartsInvestGwEvComponent', () => {
  let component: ChartsInvestGwEvComponent;
  let fixture: ComponentFixture<ChartsInvestGwEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsInvestGwEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsInvestGwEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
