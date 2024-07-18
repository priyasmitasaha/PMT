import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlineMissedTasksComponent } from './deadline-missed-tasks.component';

describe('DeadlineMissedTasksComponent', () => {
  let component: DeadlineMissedTasksComponent;
  let fixture: ComponentFixture<DeadlineMissedTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeadlineMissedTasksComponent]
    });
    fixture = TestBed.createComponent(DeadlineMissedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
