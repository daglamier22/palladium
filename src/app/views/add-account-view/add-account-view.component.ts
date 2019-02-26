import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AddAccountService } from '../../services/accounts/add-account/add-account.service';
import { AddAccountResponse } from '../../services/accounts/add-account/add-account.model';

@Component({
  selector: 'app-add-account-view',
  templateUrl: './add-account-view.component.html',
  styleUrls: ['./add-account-view.component.scss']
})
export class AddAccountViewComponent implements OnInit {
  accountForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private addAccountsService: AddAccountService
  ) { }

  ngOnInit() {
    this.accountForm = this.createFormGroup();
  }

  onSubmit() {
    this.markControlsTouched();
    if (this.accountForm.valid) {
      const firmName = this.accountForm.controls.firmName.value;
      const accountName = this.accountForm.controls.accountName.value;
      const accountType = this.accountForm.controls.accountType.value;
      const originalBalance = this.accountForm.controls.originalBalance.value;
      const currentBalance = this.accountForm.controls.currentBalance.value;
      const interestRate = this.accountForm.controls.interestRate.value;
      const creditLimit = this.accountForm.controls.creditLimit.value;
      const loanTerm = this.accountForm.controls.loanTerm.value;
      const loanOriginationDate = this.accountForm.controls.loanOriginationDate.value;
      this.loading = true;
      this.addAccountsService.call(firmName, accountName, accountType, originalBalance, currentBalance, interestRate, creditLimit, loanTerm, loanOriginationDate);
      this.addAccountsService.getLoadingChanged().pipe(take(1)).subscribe(
        (loading: boolean) => {
          this.loading = loading;
          const response: AddAccountResponse = this.addAccountsService.getServerResponse();
          if (response.status === 'SUCCESS') {
            this.router.navigate(['/overview']);
          }
        }
      );
    } else {
      console.log('form invalid');
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firmName: new FormControl('', {
        validators: [Validators.required]
      }),
      accountName: new FormControl('', {
        validators: [Validators.required]
      }),
      accountType: new FormControl('', {
        validators: [Validators.required]
      }),
      originalBalance: new FormControl('', {
        validators: [Validators.required]
      }),
      currentBalance: new FormControl('', {
        validators: [Validators.required]
      }),
      interestRate: new FormControl('', {}),
      creditLimit: new FormControl('', {}),
      loanTerm: new FormControl('', {}),
      loanOriginationDate: new FormControl('', {})
    });
  }

  markControlsTouched() {
    Object
      .keys(this.accountForm.controls)
      .forEach(field => {
        const control = this.accountForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
  }

  getFormControlErrors(controlName: string): string {
    const control = this.accountForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors.required) {
        return 'This is a required field.';
      }
    }
    return '';
  }
}
