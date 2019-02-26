import { Component, OnInit } from '@angular/core';
import { GetAccountsService } from '../../services/accounts/get-accounts/get-accounts.service';
import { Account } from '../../services/accounts/get-accounts/get-accounts.model';

@Component({
  selector: 'app-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: ['./overview-view.component.scss']
})
export class OverviewViewComponent implements OnInit {
  accounts: Account[];

  constructor(
    private getAccountsService: GetAccountsService
  ) { }

  ngOnInit() {
    this.getAccountsService.call();
    this.getAccountsService.getLoadingChanged().subscribe((loading: boolean) => {
      this.accounts = this.getAccountsService.getServerResponse().values.accounts;
      console.log(this.accounts);
    });
  }

}
