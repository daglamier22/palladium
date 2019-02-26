export interface EditTransactionPayload {
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

export interface EditTransactionResponse {
  message: string;
  status: string;
}
