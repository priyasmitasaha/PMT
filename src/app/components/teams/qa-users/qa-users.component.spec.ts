import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaUsersComponent } from './qa-users.component';

describe('QaUsersComponent', () => {
  let component: QaUsersComponent;
  let fixture: ComponentFixture<QaUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QaUsersComponent]
    });
    fixture = TestBed.createComponent(QaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
