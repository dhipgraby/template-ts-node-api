// models/User.ts

export interface User {
    id: number;
    username: string;
    wallet: string;
    registrationDate: Date;
    password: string;
    balance:number;
  }
  