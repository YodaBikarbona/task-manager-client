export class AuthenticationRequest {
  email: string;
  password: string;
  code: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
