import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskConfirmationComponent } from './task-confirmation.component';

describe('TaskConfirmationComponent', () => {
  let component: TaskConfirmationComponent;
  let fixture: ComponentFixture<TaskConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskConfirmationComponent]
    });
    fixture = TestBed.createComponent(TaskConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
