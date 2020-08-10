import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsNettobarwertGwDsComponent } from './charts-nettobarwert-gw-ds.component';

describe('ChartsNettobarwertGwDsComponent', () => {
  let component: ChartsNettobarwertGwDsComponent;
  let fixture: ComponentFixture<ChartsNettobarwertGwDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsNettobarwertGwDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsNettobarwertGwDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
