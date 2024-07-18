import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPerformenceComponent } from './my-performence.component';

describe('MyPerformenceComponent', () => {
  let component: MyPerformenceComponent;
  let fixture: ComponentFixture<MyPerformenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPerformenceComponent]
    });
    fixture = TestBed.createComponent(MyPerformenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
