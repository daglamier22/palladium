export interface AddTransactionPayload {
  date: string;
  accountName: string;
  description: string;
  categoryParent: string;
  categoryChild: string;
  amount: string;
  transactionType: string;
  note: string;
}

export interface AddTransactionResponse {
  message: string;
  status: string;
}
