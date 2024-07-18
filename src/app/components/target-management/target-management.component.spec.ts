import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetManagementComponent } from './target-management.component';

describe('TargetManagementComponent', () => {
  let component: TargetManagementComponent;
  let fixture: ComponentFixture<TargetManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetManagementComponent]
    });
    fixture = TestBed.createComponent(TargetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
