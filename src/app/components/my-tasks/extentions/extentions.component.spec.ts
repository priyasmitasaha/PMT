import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtentionsComponent } from './extentions.component';

describe('ExtentionsComponent', () => {
  let component: ExtentionsComponent;
  let fixture: ComponentFixture<ExtentionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtentionsComponent]
    });
    fixture = TestBed.createComponent(ExtentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
