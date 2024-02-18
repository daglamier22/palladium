import { Component, OnInit } from '@angular/core';

import { Transaction } from '../../services/transactions/get-transactions/get-transactions.model';
import { GetTransactionsService } from '../../services/transactions/get-transactions/get-transactions.service';

@Component({
  selector: 'app-view-account-view',
  templateUrl: './view-account-view.component.html',
  styleUrls: ['./view-account-view.component.scss']
})
export class ViewAccountViewComponent implements OnInit {
  public transactions: Transaction[] = [];

  constructor(
    private getTransactionsService: GetTransactionsService
  ) { }

  ngOnInit() {
    this.getTransactionsService.call();
    this.getTransactionsService.getLoadingChanged().subscribe((loading: boolean) => {
      this.transactions = this.getTransactionsService.getServerResponse().values.transactions;
    });
  }
}
