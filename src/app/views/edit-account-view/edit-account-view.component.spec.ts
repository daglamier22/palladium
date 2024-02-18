import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { EditAccountViewComponent } from './edit-account-view.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { ButtonRectangleComponent } from '../../components/buttons/button/button-rectangle.component';

describe('EditAccountViewComponent', () => {
  let component: EditAccountViewComponent;
  let fixture: ComponentFixture<EditAccountViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        EditAccountViewComponent,
        InputFieldComponent,
        ButtonRectangleComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
