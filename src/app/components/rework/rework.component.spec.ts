import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReworkComponent } from './rework.component';

describe('ReworkComponent', () => {
  let component: ReworkComponent;
  let fixture: ComponentFixture<ReworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReworkComponent]
    });
    fixture = TestBed.createComponent(ReworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
