export class SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(email: string, password: string, confirmPassword: string) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export class LoginPayload {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class AuthResponse {
  message: string;
  status: string;

  constructor(message: string, status: string) {
    this.message = message;
    this.status = status;
  }
}
