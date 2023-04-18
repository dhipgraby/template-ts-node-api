import request from "supertest";
import app from "../src/app";
import { cardStorage } from "../models/test/CardStorage";
import { userStorage } from "../models/UserStorage";

jest.mock("../models/UserStorage", () => {
    console.log('creating new user');
    
  const actualUserStorage = jest.requireActual("../models/UserStorage");
  console.log('user created');
  return {
    ...actualUserStorage,
    userStorage: {
      ...actualUserStorage.userStorage,
      getUserById: jest.fn().mockImplementation((userId: string) => ({
        id: userId,
        username: "testUser",
        walletAddress: "0x6C1667b508D712976069AEdCDb34cf74da095606",
        walletBalance: 100,
        createdAt: new Date(),
        password: "testPass",
      })),
      updateUserBalance: jest.fn(),
    },
  };
});

jest.mock("../models/CardStorage", () => {
  const actualCardStorage = jest.requireActual("../models/CardStorage");
  return {
    ...actualCardStorage,
    cardStorage: {
      ...actualCardStorage.cardStorage,
      getCardById: jest.fn().mockImplementation((cardId: string) => ({
        id: cardId,
        name: "Test Card",
        ownerId: 2,
        price: 50,
      })),
      updateCard: jest.fn(),
    },
  };
});

describe("POST /api/users/:userId/cards/:cardId/buy", () => {
    it("should buy a card for the user", async () => {
        const userId = "1";
        const cardId = "1";

        const response = await request(app)
            .post(`/api/users/${userId}/cards/${cardId}/buy`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Card purchased successfully");

        const cardStorageInstance = cardStorage as jest.Mocked<typeof cardStorage>;
        expect(cardStorageInstance.updateCard).toHaveBeenCalledTimes(1);
        expect(cardStorageInstance.updateCard).toHaveBeenCalledWith({ id: Number(cardId), name: "Test Card", owner: Number(userId), ownerId: 2, price: 50 });


    });
});