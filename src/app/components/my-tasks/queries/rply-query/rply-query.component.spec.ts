import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RplyQueryComponent } from './rply-query.component';

describe('RplyQueryComponent', () => {
  let component: RplyQueryComponent;
  let fixture: ComponentFixture<RplyQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RplyQueryComponent]
    });
    fixture = TestBed.createComponent(RplyQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
