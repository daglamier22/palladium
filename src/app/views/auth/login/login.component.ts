import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = this.createFormGroup();
  }

  onSubmit() {
    this.markControlsTouched();
    if (this.loginForm.valid) {
      console.log('form valid');
    } else {
      console.log('form invalid');
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  markControlsTouched() {
    Object
      .keys(this.loginForm.controls)
      .forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
  }

  getFormControlErrors(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors.required) {
        return 'This is a required field.';
      }
    }
    return '';
  }
}
