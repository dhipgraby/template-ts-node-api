import request from "supertest";
import app from "../src/app";
import { offerStorage } from "../models/OfferStorage";
import { userStorage } from "../models/UserStorage";
import { cardStorage } from "../models/test/CardStorage";

// Mock the UserStorage, CardStorage, and OfferStorage
jest.mock("../models/UserStorage");
jest.mock("../models/CardStorage");
jest.mock("../models/OfferStorage");

// Prepare the mocked data for users, cards, and offers
const mockedUserStorage = userStorage as jest.Mocked<typeof userStorage>;
const mockedCardStorage = cardStorage as jest.Mocked<typeof cardStorage>;
const mockedOfferStorage = offerStorage as jest.Mocked<typeof offerStorage>;

mockedUserStorage.getUserById.mockImplementation((userId: number) =>
    Promise.resolve({
        id: userId,
        username: "testUser",
        wallet: "0x6C1667b508D712976069AEdCDb34cf74da095606",
        balance: 100,
        registrationDate: new Date(),
        password: "testPass",
    })
);

mockedCardStorage.getCardById.mockImplementation((cardId: number) =>
    Promise.resolve({
        id: cardId,
        name: "Test Card",
        owner: 2,
        price: 50,
    })
);

mockedOfferStorage.getOfferById.mockImplementation((offerId: number) =>
    Promise.resolve({
        id: offerId,
        cardId: 1,
        buyerId: 1,
        sellerId: 2,
        price: 50,
        status: "pending",
    })
);

// Test suites
describe("POST /api/offers/:offerId/accept", () => {
    it("should accept an offer", async () => {
        const offerId = "1";

        const response = await request(app)
            .post(`/api/offers/${offerId}/accept`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Offer accepted successfully");
    });
});

describe("POST /api/offers/:offerId/decline", () => {
    it("should decline an offer", async () => {
        const offerId = "1";

        const response = await request(app)
            .post(`/api/offers/${offerId}/decline`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Offer declined successfully");
    });
});
