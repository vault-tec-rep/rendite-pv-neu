import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsNettobarwertGwVeComponent } from './charts-nettobarwert-gw-ve.component';

describe('ChartsNettobarwertGwVeComponent', () => {
  let component: ChartsNettobarwertGwVeComponent;
  let fixture: ComponentFixture<ChartsNettobarwertGwVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsNettobarwertGwVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsNettobarwertGwVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
