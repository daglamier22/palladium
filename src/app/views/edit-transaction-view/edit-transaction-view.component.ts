import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { EditTransactionService } from '../../services/transactions/edit-transaction/edit-transaction.service';
import { EditTransactionResponse } from '../../services/transactions/edit-transaction/edit-transaction.model';
import { GetTransactionsService } from '../../services/transactions/get-transactions/get-transactions.service';
import { Transaction } from '../../services/transactions/get-transactions/get-transactions.model';

@Component({
  selector: 'app-edit-transaction-view',
  templateUrl: './edit-transaction-view.component.html',
  styleUrls: ['./edit-transaction-view.component.scss']
})
export class EditTransactionViewComponent implements OnInit {
  public transactionForm!: FormGroup;
  public loading: boolean = false;
  public transactionId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getTransactionsService: GetTransactionsService,
    private editTransactionService: EditTransactionService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const transactionId: string | null = params.get('id');
      if (transactionId) {
        this.transactionId = transactionId;
      }
    });
    this.transactionForm = this.createFormGroup();
    this.getTransaction();
  }

  private createFormGroup(): FormGroup {
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

  private getTransaction(): void {
    let transaction: Transaction | null = this.getTransactionsService.getTransaction(this.transactionId);
    if (transaction) {
      this.setFormValues(transaction);
    } else {
      this.getTransactionsService.call();
      this.getTransactionsService.getLoadingChanged().pipe(take(1)).subscribe(
        (loading: boolean) => {
          if (!loading) {
            transaction = this.getTransactionsService.getTransaction(this.transactionId);
            if (transaction) {
              this.setFormValues(transaction);
            }
          }
        }
      );
    }
  }

  private setFormValues(transaction: Transaction): void {
    if (!transaction) {
      return;
    }
    this.transactionForm.controls.date.setValue(transaction.date);
    this.transactionForm.controls.accountName.setValue(transaction.accountName);
    this.transactionForm.controls.description.setValue(transaction.description);
    this.transactionForm.controls.categoryParent.setValue(transaction.categoryParent);
    this.transactionForm.controls.categoryChild.setValue(transaction.categoryChild);
    this.transactionForm.controls.amount.setValue(transaction.amount);
    this.transactionForm.controls.transactionType.setValue(transaction.transactionType);
    this.transactionForm.controls.note.setValue(transaction.note);
  }

  public onSubmit(): void {
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
      this.editTransactionService.call(this.transactionId, date, accountName, description, categoryParent, categoryChild, amount, transactionType, note);
      this.editTransactionService.getLoadingChanged().pipe(take(1)).subscribe(
        (loading: boolean) => {
          this.loading = loading;
          const response: EditTransactionResponse = this.editTransactionService.getServerResponse();
          if (response.status === 'SUCCESS') {
            this.router.navigate(['/overview']);
          }
        }
      );
    } else {
      console.log('form invalid');
    }
  }

  private markControlsTouched(): void {
    Object
      .keys(this.transactionForm.controls)
      .forEach(field => {
        const control = this.transactionForm.get(field);
        if (control) {
          control.markAsTouched({onlySelf: true});
        }
      });
  }

  public getFormControlErrors(controlName: string): string {
    const control = this.transactionForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors.required) {
        return 'This is a required field.';
      }
    }
    return '';
  }
}
