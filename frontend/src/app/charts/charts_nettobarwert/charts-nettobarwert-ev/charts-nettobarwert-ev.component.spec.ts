import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsNettobarwertEvComponent } from './charts-nettobarwert-ev.component';

describe('ChartsNettobarwertEvComponent', () => {
  let component: ChartsNettobarwertEvComponent;
  let fixture: ComponentFixture<ChartsNettobarwertEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsNettobarwertEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsNettobarwertEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
