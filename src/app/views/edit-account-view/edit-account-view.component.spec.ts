import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountViewComponent } from './edit-account-view.component';

describe('EditAccountViewComponent', () => {
  let component: EditAccountViewComponent;
  let fixture: ComponentFixture<EditAccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
