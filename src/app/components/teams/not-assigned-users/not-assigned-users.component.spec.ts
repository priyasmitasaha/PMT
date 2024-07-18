import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAssignedUsersComponent } from './not-assigned-users.component';

describe('NotAssignedUsersComponent', () => {
  let component: NotAssignedUsersComponent;
  let fixture: ComponentFixture<NotAssignedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAssignedUsersComponent]
    });
    fixture = TestBed.createComponent(NotAssignedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
