import request from "supertest";
import app from "../src/app";
import { getNftsForOwner } from "../src/controllers/test/api";

describe("GET /api/wallets/:walletAddress/nfts", () => {
    it("should return NFTs for a given wallet", async () => {
        const walletAddress = "0xC07814A15243AcD8FBA05c083e8dbF789EE86Dfa";
        const response = await request(app).get(`/api/wallets/${walletAddress}/nfts`);

        expect(response.status).toBe(200);
        expect(response.body.nfts.totalCount).toBeDefined();
    });
});