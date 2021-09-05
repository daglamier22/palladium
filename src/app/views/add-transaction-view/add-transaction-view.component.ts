import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AddTransactionService } from '../../services/transactions/add-transaction/add-transaction.service';
import { AddTransactionResponse } from '../../services/transactions/add-transaction/add-transaction.model';

@Component({
  selector: 'app-add-transaction-view',
  templateUrl: './add-transaction-view.component.html',
  styleUrls: ['./add-transaction-view.component.scss']
})
export class AddTransactionViewComponent implements OnInit {
  public transactionForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private addTransactionService: AddTransactionService
  ) { }

  ngOnInit() {
    this.transactionForm = this.createFormGroup();
  }

  onSubmit() {
    this.markControlsTouched();
    if (this.transactionForm.valid) {
      const date = this.transactionForm.controls.date.value;
      const accountName = this.transactionForm.controls.accountName.value;
      const description = this.transactionForm.controls.description.value;
      const categoryParent = this.transactionForm.controls.categoryParent.value;
      const categoryChild = this.transactionForm.controls.categoryChild.value;
      const amount = this.transactionForm.controls.amount.value;
      const transactionType = this.transactionForm.controls.transactionType.value;
      const note = this.transactionForm.controls.note.value;
      this.loading = true;
      this.addTransactionService.call(date, accountName, description, categoryParent, categoryChild, amount, transactionType, note);
      this.addTransactionService.getLoadingChanged().pipe(take(1)).subscribe(
        (loading: boolean) => {
          this.loading = loading;
          const response: AddTransactionResponse = this.addTransactionService.getServerResponse();
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
      date: new FormControl('', {
        validators: [Validators.required]
      }),
      accountName: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      }),
      categoryParent: new FormControl('', {
        validators: [Validators.required]
      }),
      categoryChild: new FormControl('', {
        validators: [Validators.required]
      }),
      amount: new FormControl('', {
        validators: [Validators.required]
      }),
      transactionType: new FormControl('', {
        validators: [Validators.required]
      }),
      note: new FormControl('', {}),
    });
  }

  markControlsTouched() {
    Object
      .keys(this.transactionForm.controls)
      .forEach(field => {
        const control = this.transactionForm.get(field);
        if (control) {
          control.markAsTouched({onlySelf: true});
        }
      });
  }

  getFormControlErrors(controlName: string): string {
    const control = this.transactionForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors.required) {
        return 'This is a required field.';
      }
    }
    return '';
  }
}
