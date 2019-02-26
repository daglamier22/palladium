export interface GetAccountResponse {
  message: string;
  status: string;
  values: {
    accounts: Account[];
  };
}

export interface Account {
  _id: string;
  firmName: string;
  accountName: string;
  accountType: string;
  originalBalance: string;
  currentBalance: string;
  interestRate: string;
  creditLimit: string;
  loanTerm: string;
  loanOriginationDate: string;
}
