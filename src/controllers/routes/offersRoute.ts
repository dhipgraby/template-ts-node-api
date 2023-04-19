import { Application } from 'express';
import { sendOffer, acceptOffer, declineOffer, getOfferById } from '../offerController';

export const offersRoute = (app: Application): void => {
  app.post('/api/offers', sendOffer);
  app.post('/api/offers/:offerId/accept', acceptOffer);
  app.post('/api/offers/:offerId/decline', declineOffer);
  app.get('/api/offers/:offerId', getOfferById);
};
