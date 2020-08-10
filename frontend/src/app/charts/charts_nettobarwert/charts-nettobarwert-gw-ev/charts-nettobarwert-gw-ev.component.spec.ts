import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsNettobarwertGwEvComponent } from './charts-nettobarwert-gw-ev.component';

describe('ChartsNettobarwertGwEvComponent', () => {
  let component: ChartsNettobarwertGwEvComponent;
  let fixture: ComponentFixture<ChartsNettobarwertGwEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsNettobarwertGwEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsNettobarwertGwEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
