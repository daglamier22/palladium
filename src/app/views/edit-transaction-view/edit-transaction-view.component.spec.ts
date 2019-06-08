import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { EditTransactionViewComponent } from './edit-transaction-view.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';

describe('EditTransactionViewComponent', () => {
  let component: EditTransactionViewComponent;
  let fixture: ComponentFixture<EditTransactionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        EditTransactionViewComponent,
        InputFieldComponent,
        ButtonComponent
      ]
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
