import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResitComponent } from './resit.component';

describe('ResitComponent', () => {
  let component: ResitComponent;
  let fixture: ComponentFixture<ResitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResitComponent]
    });
    fixture = TestBed.createComponent(ResitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
