import { Application } from 'express';
import { createCard, getCardById } from '../cardController';

export const createCardRoute = (app: Application): void => {
    app.post('/api/cards', createCard);
    app.get('/api/cards/:cardId', getCardById);
};
