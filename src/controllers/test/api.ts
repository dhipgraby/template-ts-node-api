import { Application, Request, Response } from 'express';
import { registerUser, getUserById } from './userController';


export const loadTestApiEndpoints = (app: Application): void => {

  app.get('/api', (req: Request, res: Response) => {
    console.log('Welcome test message')
    return res.status(200).send({ message: 'very welcome' });
  });
  app.post('/api/register', registerUser);
  app.get('/api/users/:userId', getUserById);

};

