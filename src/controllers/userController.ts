import { Request, Response } from "express";
import { User } from "../../models/User";
import { userStorage } from "../../models/UserStorage";

export const registerUser = (req: Request, res: Response): void => {
  const { username, wallet, password,balance } = req.body;

  if (userStorage.getUserByUsername(username) || userStorage.getUserByWallet(wallet)) {
    res.status(400).send({ message: "Username or wallet already exists" });
    return;
  }

  const newUser: User = {
    id: Date.now(),
    username,
    wallet,
    registrationDate: new Date(),
    password,
    balance
  };

  const createdUser = userStorage.createUser(newUser);

  res.status(201).send({ message: "User registered successfully", user: createdUser });
};

export { User, userStorage };