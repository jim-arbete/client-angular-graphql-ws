import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseWidgetComponent } from './house-widget.component';

describe('HouseWidgetComponent', () => {
  let component: HouseWidgetComponent;
  let fixture: ComponentFixture<HouseWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
