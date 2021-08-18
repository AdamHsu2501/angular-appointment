import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeZoneButtonComponent } from './time-zone-button.component';

describe('TimeZoneButtonComponent', () => {
  let component: TimeZoneButtonComponent;
  let fixture: ComponentFixture<TimeZoneButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeZoneButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
