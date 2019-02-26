import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionViewComponent } from './add-transaction-view.component';

describe('AddTransactionViewComponent', () => {
  let component: AddTransactionViewComponent;
  let fixture: ComponentFixture<AddTransactionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
