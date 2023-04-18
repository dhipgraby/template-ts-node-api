import { Application } from 'express';
import { sendOffer, acceptOffer, declineOffer } from '../offerController';

export const offersRoute = (app: Application): void => {
  app.post('/api/offers', sendOffer);
  app.post('/api/offers/:offerId/accept', acceptOffer);
  app.post('/api/offers/:offerId/decline', declineOffer);
};
