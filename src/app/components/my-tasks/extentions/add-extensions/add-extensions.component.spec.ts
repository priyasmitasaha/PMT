import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtensionsComponent } from './add-extensions.component';

describe('AddExtensionsComponent', () => {
  let component: AddExtensionsComponent;
  let fixture: ComponentFixture<AddExtensionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExtensionsComponent]
    });
    fixture = TestBed.createComponent(AddExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
