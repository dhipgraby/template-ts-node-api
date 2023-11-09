import { Request, Response } from "express";
import { Application } from 'express';

export const welcomeRoute = (app: Application): void => {

    app.get('/api', (req: Request, res: Response) => {
        console.log('Welcome test message')
        return res.status(200).send({ message: 'very welcome' });
    });
};

