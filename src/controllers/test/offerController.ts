import { Request, Response } from "express";
import { offerStorage } from "../../../models/test/OfferStorage";
import { cardStorage } from "../../../models/test/CardStorage";
import { userStorage } from "../../../models/test/UserStorage";

export const sendOffer = async (req: Request, res: Response): Promise<void> => {
    const { cardId, buyerId, sellerId, price } = req.body;

    if (buyerId === sellerId) {
        res.status(400).send({ message: "Buyer and seller cannot be the same user." });
        return;
    }

    const card = await cardStorage.getCardById(cardId);
    if (!card || card.owner !== sellerId) {
        res.status(404).send({ message: "Card not found or not owned by the seller." });
        return;
    }

    const buyer = await userStorage.getUserById(buyerId);
    const seller = await userStorage.getUserById(sellerId);

    if (!buyer || !seller) {
        res.status(404).send({ message: "Buyer or seller not found." });
        return;
    }

    if (price <= 0) {
        res.status(400).send({ message: "Price must be a positive number." });
        return;
    }

    const offer = await offerStorage.createOffer({ cardId, buyerId, sellerId, price });
    res.status(201).send({ message: "Offer sent successfully.", offer });
};

export const acceptOffer = async (req: Request, res: Response): Promise<void> => {
    const offerId = Number(req.params.offerId);

    const offer = await offerStorage.getOfferById(offerId);
    if (!offer) {
        res.status(404).send({ message: "Offer not found." });
        return;
    }

    const card = await cardStorage.getCardById(offer.cardId);
    const buyer = await userStorage.getUserById(offer.buyerId);
    const seller = await userStorage.getUserById(offer.sellerId);

    if (!card || !buyer || !seller || card.owner !== seller.id) {
        res.status(400).send({ message: "Invalid offer." });
        return;
    }

    if (buyer.balance < offer.price) {
        res.status(400).send({ message: "Insufficient funds in buyer's wallet." });
        return;
    }

    await userStorage.updateUserBalance(buyer.id, buyer.balance - offer.price);
    await userStorage.updateUserBalance(seller.id, seller.balance + offer.price);

    card.owner = buyer.id;
    await cardStorage.updateCard(card);

    //Offer status to accepted.
    await offerStorage.updateOfferStatus(offer.id, 'accepted');

    res.status(200).send({ message: "Offer accepted successfully", card });
};

export const declineOffer = async (req: Request, res: Response): Promise<void> => {
    const offerId = Number(req.params.offerId);

    const offer = await offerStorage.getOfferById(offerId);
    if (!offer) {
        res.status(404).send({ message: "Offer not found." });
        return;
    }

    //Offer status to declined.
    await offerStorage.updateOfferStatus(offer.id, 'declined');

    res.status(200).send({ message: "Offer declined successfully" });
};
