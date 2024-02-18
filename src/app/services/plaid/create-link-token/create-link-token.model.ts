export interface CreateLinkTokenResponse {
  apiMessage: string;
  apiStatus: string;
  errorCode: number;
  values: {
    expiration: string;
    linkToken: string;
  };
}
