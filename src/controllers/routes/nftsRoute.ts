import { Application, Request, Response } from 'express';
import { Network } from 'alchemy-sdk';
import { useAlchemy } from '../../../hooks/useAlchemy';

const { getNftsForOwner } = useAlchemy(Network.MATIC_MUMBAI);

export const nftsRoute = (app: Application): void => {
    app.get('/api/wallets/:walletAddress/nfts', async (req: Request, res: Response) => {
        const walletAddress = req.params.walletAddress;
        const nfts = await getNftsForOwner(walletAddress);
        return res.status(200).send({ nfts });
    });
};
