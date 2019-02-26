export interface AddAccountPayload {
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

export interface AddAccountResponse {
  message: string;
  status: string;
}
