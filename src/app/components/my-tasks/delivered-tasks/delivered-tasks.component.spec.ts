import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredTasksComponent } from './delivered-tasks.component';

describe('DeliveredTasksComponent', () => {
  let component: DeliveredTasksComponent;
  let fixture: ComponentFixture<DeliveredTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveredTasksComponent]
    });
    fixture = TestBed.createComponent(DeliveredTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
