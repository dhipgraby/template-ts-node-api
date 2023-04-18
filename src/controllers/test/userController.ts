import { Request, Response } from "express";
import { User } from "../../../types/User";
import { userStorage } from "../../../models/test/UserStorage";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, wallet, password, balance } = req.body;

  if (await userStorage.getUserByUsername(username) || await userStorage.getUserByWallet(wallet)) {
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