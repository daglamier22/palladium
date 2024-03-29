import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AddTransactionViewComponent } from './add-transaction-view.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { ButtonRectangleComponent } from '../../components/buttons/button/button-rectangle.component';

describe('AddTransactionViewComponent', () => {
  let component: AddTransactionViewComponent;
  let fixture: ComponentFixture<AddTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        AddTransactionViewComponent,
        InputFieldComponent,
        ButtonRectangleComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
