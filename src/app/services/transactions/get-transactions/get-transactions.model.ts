export interface GetTransactionsResponse {
  message: string;
  status: string;
  values: {
    transactions: Transaction[];
  };
}

export class Transaction {
  public _id: string = '';
  public date: string = '';
  public accountName: string = '';
  public description: string = '';
  public categoryParent: string = '';
  public categoryChild: string = '';
  public amount: string = '';
  public transactionType: string = '';
  public note: string = '';
}
