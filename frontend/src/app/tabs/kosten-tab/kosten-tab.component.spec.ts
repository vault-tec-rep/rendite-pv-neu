import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KostenTabComponent } from './kosten-tab.component';

describe('KostenTabComponent', () => {
  let component: KostenTabComponent;
  let fixture: ComponentFixture<KostenTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KostenTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KostenTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
