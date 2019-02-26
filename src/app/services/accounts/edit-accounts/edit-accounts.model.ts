export interface EditAccountPayload {
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

export interface EditAccountResponse {
  message: string;
  status: string;
}
