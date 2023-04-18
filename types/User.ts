export interface User {
  id: number;
  username: string;
  wallet: string;
  registrationDate: Date;
  password: string;
  balance: number;
}

export interface NewUser {
  username: string;
  wallet: string;
  registrationDate: Date;
  password: string;
  balance: number;
}
