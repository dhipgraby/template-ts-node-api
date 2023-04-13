import { Application, Request, Response } from "express";
import { registerUser } from "./userController";
import { Network } from "alchemy-sdk";
import { useAlchemy } from "../../hooks/useAlchemy";
import { buyCard } from "./cardController";

const { getNftsForOwner } = useAlchemy(Network.MATIC_MUMBAI);

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send({ message: "welcome" });
  });
  app.post("/api/register", registerUser);
  app.post("/api/users/:userId/cards/:cardId/buy", buyCard);
  app.get("/api/wallets/:walletAddress/nfts", async (req: Request, res: Response) => {
    const walletAddress = req.params.walletAddress;
    const nfts = await getNftsForOwner(walletAddress);
    return res.status(200).send({ nfts });
  });
};

export { getNftsForOwner }; // Export the function for testing purposes
