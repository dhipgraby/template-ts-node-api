import { Application } from 'express';
import { buyCard } from '../cardController';

export const buyCardRoute = (app: Application): void => {
  app.post('/api/users/:userId/cards/:cardId/buy', buyCard);
};
