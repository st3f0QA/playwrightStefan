export interface Credentials {
  username: string;
  password: string;
}

export interface UserFixture {
  validUser: Credentials;
  invalidUser: Credentials;
}