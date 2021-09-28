export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  apiMessage: string;
  apiStatus: string;
  values: {
    id: string;
    token: string;
    userId: string;
  }
}
