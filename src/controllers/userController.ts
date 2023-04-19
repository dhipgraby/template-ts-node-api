import { Request, Response } from "express";
import { User, NewUser } from "../../types/User";
import { userStorage } from "../../models/UserStorage";
import {
  isValidUsername,
  isValidPassword,
  nameError,
  passwordError
} from "../../helpers/validation";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, wallet, password, balance } = req.body;

  if (!isValidUsername(username)) {
    res.status(400).send({ message: nameError });
    return;
  }

  if (!isValidPassword(password)) {
    res.status(400).send({ message: passwordError });
    return;
  }

  if (await userStorage.getUserByUsername(username) || await userStorage.getUserByWallet(wallet)) {
    res.status(400).send({ message: "Username or wallet already exists" });
    return;
  }

  const newUser: NewUser = {
    username,
    wallet,
    registrationDate: new Date(),
    password,
    balance
  };

  const createdUser = await userStorage.createUser(newUser as User);

  res.status(201).send({ message: "User registered successfully", user: createdUser });
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.userId, 10);

  const user = await userStorage.getUserById(userId);
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  res.status(200).send({ user });
};

export { User, userStorage };
