import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsInvestMsComponent } from './charts-invest-ms.component';

describe('ChartsInvestMsComponent', () => {
  let component: ChartsInvestMsComponent;
  let fixture: ComponentFixture<ChartsInvestMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsInvestMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsInvestMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
