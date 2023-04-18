import { Application, Request, Response } from 'express';
import { registerUser } from './userController';
import { Network } from 'alchemy-sdk';
import { useAlchemy } from '../../hooks/useAlchemy';
import { buyCard } from './cardController';
import { sendOffer, acceptOffer, declineOffer } from './offerController';

const { getNftsForOwner } = useAlchemy(Network.MATIC_MUMBAI);

export const loadApiEndpoints = (app: Application): void => {
  /**
   * @swagger
   * /api:
   *   get:
   *     description: Welcome message
   *     responses:
   *       200:
   *         description: Returns a welcome message
   */
  app.get('/api', (req: Request, res: Response) => {
    return res.status(200).send({ message: 'welcome' });
  });

  /**
   * @swagger
   * /api/register:
   *   post:
   *     description: Register a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User registration successful
   *       400:
   *         description: Bad request
   */
  app.post('/api/register', registerUser);
  /**
 * @swagger
 * /api/users/{userId}/cards/{cardId}/buy:
 *   post:
 *     tags:
 *       - Cards
 *     summary: Buy a card
 *     description: Buy a card by providing the user ID and card ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the card
 *     responses:
 *       200:
 *         description: Card purchased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Card purchased successfully *                
 *       400:
 *         description: Insufficient funds in user's wallet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Insufficient funds in user's wallet
 *       404:
 *         description: User or card not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User or card not found
 */
  app.post('/api/users/:userId/cards/:cardId/buy', buyCard);

  app.post('/api/offers', sendOffer);
  app.post('/api/offers/:offerId/accept', acceptOffer);
  app.post('/api/offers/:offerId/decline', declineOffer);
  app.get('/api/wallets/:walletAddress/nfts', async (req: Request, res: Response) => {
    const walletAddress = req.params.walletAddress;
    const nfts = await getNftsForOwner(walletAddress);
    return res.status(200).send({ nfts });
  });
};

export { getNftsForOwner }; // Export
