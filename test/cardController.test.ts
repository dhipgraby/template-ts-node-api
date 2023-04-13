// src/tests/cardController.test.ts

import request from "supertest";
import app from "../src/app";
import { cardStorage } from "../models/CardStorage";
import { userStorage } from "../models/UserStorage";

jest.mock("../controllers/userController", () => ({
    userStorage: {
        getUserById: (userId: string) => ({
            id: userId,
            username: "testUser",
            walletAddress: "0x6C1667b508D712976069AEdCDb34cf74da095606",
            walletBalance: 100,
            createdAt: new Date(),
            password: "testPass",
        }),
    },
}));

jest.mock("../controllers/cardController", () => ({
    cardStorage: {
        getCardById: (cardId: string) => ({
            id: cardId,
            name: "Test Card",
            ownerId: "2",
            price: 50,
        }),
        updateCard: jest.fn(),
    },
}));

describe("POST /api/users/:userId/cards/:cardId/buy", () => {
    it("should buy a card for the user", async () => {
        const userId = "1";
        const cardId = "1";

        const response = await request(app)
            .post(`/api/users/${userId}/cards/${cardId}/buy`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Card successfully purchased.");

        const cardStorageInstance = cardStorage as jest.Mocked<typeof cardStorage>;
        expect(cardStorageInstance.updateCard).toHaveBeenCalledTimes(1);
        expect(cardStorageInstance.updateCard).toHaveBeenCalledWith({ id: cardId, name: "Test Card", ownerId: userId, price: 50 });
    });
});