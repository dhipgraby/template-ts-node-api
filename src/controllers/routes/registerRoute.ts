import { Application } from 'express';
import { registerUser, getUserById } from '../userController';

export const registerRoute = (app: Application): void => {
    app.post('/api/register', registerUser);
    app.get('/api/users/:userId', getUserById);
};
