import { Application, Request, Response } from 'express';
import { registerUser } from './userController';

export const loadTestApiEndpoints = (app: Application): void => {

  app.get('/api', (req: Request, res: Response) => {
    return res.status(200).send({ message: 'welcome' });
  });
  app.post('/api/register', registerUser);
};

