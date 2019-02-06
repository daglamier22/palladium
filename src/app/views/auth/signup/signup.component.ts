import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from '../../../services/auth/auth.service';
import { AuthResponse } from '../../../services/auth/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = this.createFormGroup();
  }

  onSubmit() {
    this.markControlsTouched();
    if (this.signupForm.valid && this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
      if (this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
        const username = this.signupForm.controls.username.value;
        const password = this.signupForm.controls.password.value;
        const confirmPassword = this.signupForm.controls.confirmPassword.value;
        this.loading = true;
        this.authService.signup(username, password, confirmPassword);
        this.authService.getLoadingChangedSignup().pipe(take(1)).subscribe(
          (loading: boolean) => {
            this.loading = loading;
            const response: AuthResponse = this.authService.getServerResponseSignup();
            if (response.status === 'SUCCESS') {
              this.router.navigate(['/login']);
            }
          }
        );
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
        validators: [Validators.required, Validators.minLength(4)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)]
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
        return 'Must be a minimum of 4 characters.';
      }
    }
    return '';
  }
}
