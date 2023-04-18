import { Application } from 'express';
import { registerRoute } from './routes/registerRoute';
import { buyCardRoute } from './routes/buyCardRoute';
import { offersRoute } from './routes/offersRoute';
import { nftsRoute } from './routes/nftsRoute';
import { welcomeRoute } from './routes/welcomeRoute';
import { createCardRoute } from "./routes/createCardRoute";
import { useAlchemy } from '../../hooks/useAlchemy';
import { Network } from 'alchemy-sdk';

const { getNftsForOwner } = useAlchemy(Network.MATIC_MUMBAI);

export const loadApiEndpoints = (app: Application): void => {
  welcomeRoute(app);
  registerRoute(app);
  buyCardRoute(app);
  offersRoute(app);
  nftsRoute(app);
  createCardRoute(app);
};

export { getNftsForOwner }; // Export
