
import request from "supertest";
import app from "../src/app";
import { userStorage } from "../models/test/UserStorage";

describe("User Registration", () => {
    beforeEach(() => {
        // Clear user storage before each test
        (userStorage as any).users = [];
    });

    test("Register a new user", async () => {
        const response = await request(app)
            .post("/api/register")
            .send({ username: "testuser", wallet: "0x12345", password: "testpass" });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully");
        expect(response.body.user).toHaveProperty("username", "testuser");
        expect(response.body.user).toHaveProperty("wallet", "0x12345");
    });

    test("Attempt to register with an existing username", async () => {
        userStorage.createUser({
            id: 1,
            username: "existinguser",
            wallet: "0x12345",
            registrationDate: new Date(),
            password: "existingpass",
            balance: 1000
        });

        const response = await request(app)
            .post("/api/register")
            .send({ username: "existinguser", wallet: "0x67890", password: "newpass" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Username or wallet already exists");
    });

    test("Attempt to register with an existing wallet", async () => {
        await userStorage.createUser({
            id: 1,
            username: "existinguser",
            wallet: "0x12345",
            registrationDate: new Date(),
            password: "existingpass",
            balance: 5000
        });

        const response = await request(app)
            .post("/api/register")
            .send({ username: "newuser", wallet: "0x12345", password: "newpass" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Username or wallet already exists");
    });
});