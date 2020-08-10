import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsNettobarwertMsComponent } from './charts-nettobarwert-ms.component';

describe('ChartsNettobarwertMsComponent', () => {
  let component: ChartsNettobarwertMsComponent;
  let fixture: ComponentFixture<ChartsNettobarwertMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsNettobarwertMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsNettobarwertMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
