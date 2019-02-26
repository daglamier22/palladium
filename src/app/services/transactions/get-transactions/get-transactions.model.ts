export interface GetTransactionsResponse {
  message: string;
  status: string;
  values: {
    transactions: Transaction[];
  };
}

export interface Transaction {
  _id: string;
  date: string;
  accountName: string;
  description: string;
  categoryParent: string;
  categoryChild: string;
  amount: string;
  transactionType: string;
  note: string;
}
