import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAllocationComponent } from './task-allocation.component';

describe('TaskAllocationComponent', () => {
  let component: TaskAllocationComponent;
  let fixture: ComponentFixture<TaskAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAllocationComponent]
    });
    fixture = TestBed.createComponent(TaskAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
