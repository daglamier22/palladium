import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountViewComponent } from './add-account-view.component';

describe('AddAccountViewComponent', () => {
  let component: AddAccountViewComponent;
  let fixture: ComponentFixture<AddAccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
