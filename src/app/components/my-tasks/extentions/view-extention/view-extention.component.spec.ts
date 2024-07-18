import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExtentionComponent } from './view-extention.component';

describe('ViewExtentionComponent', () => {
  let component: ViewExtentionComponent;
  let fixture: ComponentFixture<ViewExtentionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExtentionComponent]
    });
    fixture = TestBed.createComponent(ViewExtentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
