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
  message: string;
  status: string;
  values: {
    id: string;
    token: string;
    userId: string;
  }
}
