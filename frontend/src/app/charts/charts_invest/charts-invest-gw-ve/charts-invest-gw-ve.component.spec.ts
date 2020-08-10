import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsInvestGwVeComponent } from './charts-invest-gw-ve.component';

describe('ChartsInvestGwVeComponent', () => {
  let component: ChartsInvestGwVeComponent;
  let fixture: ComponentFixture<ChartsInvestGwVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsInvestGwVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsInvestGwVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
