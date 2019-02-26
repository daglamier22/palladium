import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionViewComponent } from './edit-transaction-view.component';

describe('EditTransactionViewComponent', () => {
  let component: EditTransactionViewComponent;
  let fixture: ComponentFixture<EditTransactionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransactionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
