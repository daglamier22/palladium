import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.signupForm = this.createFormGroup();
  }

  onSubmit() {
    this.markControlsTouched();
    if (this.signupForm.valid && this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
      console.log('form valid');
      if (this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
        console.log('passwords match');
      } else {
        console.log('passwords do not match');
      }
    } else {
      console.log('form invalid');
      if (this.signupForm.controls.password.value !== this.signupForm.controls.confirmPassword.value) {
        console.log('passwords do not match');
      }
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  markControlsTouched() {
    Object
      .keys(this.signupForm.controls)
      .forEach(field => {
        const control = this.signupForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
  }

  passwordsMatch(): boolean {
    if (this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
      return true;
    }
    return false;
  }

  getFormControlErrors(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors.required) {
        return 'This is a required field.';
      }
      if (control.errors.minlength) {
        return 'Must be a minimum of 6 characters.';
      }
    }
    return '';
  }
}
