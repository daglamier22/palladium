export interface CreateItemResponse {
  apiMessage: string;
  apiStatus: string;
  errorCode: number;
  values: {
    item_id: string;
  };
}
