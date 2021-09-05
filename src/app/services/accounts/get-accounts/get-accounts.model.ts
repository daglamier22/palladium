export interface GetAccountResponse {
  message: string;
  status: string;
  values: {
    accounts: Account[];
  };
}

export class Account {
  public _id: string = '';
  public firmName: string = '';
  public accountName: string = '';
  public accountType: string = '';
  public originalBalance: string = '';
  public currentBalance: string = '';
  public interestRate: string = '';
  public creditLimit: string = '';
  public loanTerm: string = '';
  public loanOriginationDate: string = '';
}
