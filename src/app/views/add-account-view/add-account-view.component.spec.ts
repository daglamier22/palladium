import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AddAccountViewComponent } from './add-account-view.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { ButtonRectangleComponent } from '../../components/buttons/button/button-rectangle.component';

describe('AddAccountViewComponent', () => {
  let component: AddAccountViewComponent;
  let fixture: ComponentFixture<AddAccountViewComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        AddAccountViewComponent,
        InputFieldComponent,
        ButtonRectangleComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
