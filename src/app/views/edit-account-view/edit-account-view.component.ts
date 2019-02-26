import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { EditAccountService } from '../../services/accounts/edit-account/edit-account.service';
import { EditAccountResponse } from '../../services/accounts/edit-account/edit-account.model';
import { GetAccountsService } from '../../services/accounts/get-accounts/get-accounts.service';
import { Account } from '../../services/accounts/get-accounts/get-accounts.model';

@Component({
  selector: 'app-edit-account-view',
  templateUrl: './edit-account-view.component.html',
  styleUrls: ['./edit-account-view.component.scss']
})
export class EditAccountViewComponent implements OnInit {
  accountForm: FormGroup;
  loading: boolean;
  accountId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getAccountsService: GetAccountsService,
    private editAccountsService: EditAccountService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.accountId = params.get('id'));
    this.accountForm = this.createFormGroup();
    this.getAccount();
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

  getAccount() {
    let account: Account = this.getAccountsService.getAccount(this.accountId);
    if (account) {
      this.setFormValues(account);
    } else {
      this.getAccountsService.call();
      this.getAccountsService.getLoadingChanged().pipe(take(1)).subscribe(
        (loading: boolean) => {
          if (!loading) {
            account = this.getAccountsService.getAccount(this.accountId);
            this.setFormValues(account);
          }
        }
      );
    }
  }

  setFormValues(account: Account) {
    if (!account) {
      return;
    }
    this.accountForm.controls.firmName.setValue(account.firmName);
    this.accountForm.controls.accountName.setValue(account.accountName);
    this.accountForm.controls.accountType.setValue(account.accountType);
    this.accountForm.controls.originalBalance.setValue(account.originalBalance);
    this.accountForm.controls.currentBalance.setValue(account.currentBalance);
    this.accountForm.controls.interestRate.setValue(account.interestRate);
    this.accountForm.controls.creditLimit.setValue(account.creditLimit);
    this.accountForm.controls.loanTerm.setValue(account.loanTerm);
    this.accountForm.controls.loanOriginationDate.setValue(account.loanOriginationDate);
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
      this.editAccountsService.call(this.accountId, firmName, accountName, accountType, originalBalance, currentBalance, interestRate, creditLimit, loanTerm, loanOriginationDate);
      this.editAccountsService.getLoadingChanged().pipe(take(1)).subscribe(
        (loading: boolean) => {
          this.loading = loading;
          const response: EditAccountResponse = this.editAccountsService.getServerResponse();
          if (response.status === 'SUCCESS') {
            this.router.navigate(['/overview']);
          }
        }
      );
    } else {
      console.log('form invalid');
    }
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
