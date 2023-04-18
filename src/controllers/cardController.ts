import { Request, Response } from "express";
import { cardStorage } from "../../models/CardStorage";
import { User, userStorage } from "./userController";

export const buyCard = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const cardId = Number(req.params.cardId);

    const user = await userStorage.getUserById(userId);
    const card = await cardStorage.getCardById(cardId);

    if (!user || !card) {
        return res.status(404).send({ message: "User or card not found" });
    }

    if (user.balance < card.price) {
        return res.status(400).send({ message: "Insufficient funds in user's wallet" });
    }

    const newWalletBalance = user.balance - card.price;
    await userStorage.updateUserBalance(userId, newWalletBalance);

    card.owner = userId;
    await cardStorage.updateCard(card);

    return res.status(200).send({ message: "Card purchased successfully", card });
};

export const createCard = async (req: Request, res: Response) => {
    const { name, price, owner } = req.body;

    if (!name || price === undefined) {
        return res.status(400).send({ message: "Missing required fields: name or price" });
    }

    const newCard = await cardStorage.createCard({ name, price, owner });

    return res.status(201).send({ message: "Card created successfully", card: newCard });
};

export const getCardById = async (req: Request, res: Response) => {
    const cardId = Number(req.params.cardId);
    const card = await cardStorage.getCardById(cardId);

    if (!card) {
        return res.status(404).send({ message: "Card not found" });
    }

    return res.status(200).send({ card });
};


