import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProfileDetailsComponent } from './team-profile-details.component';

describe('TeamProfileDetailsComponent', () => {
  let component: TeamProfileDetailsComponent;
  let fixture: ComponentFixture<TeamProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamProfileDetailsComponent]
    });
    fixture = TestBed.createComponent(TeamProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
