import { Request, Response } from "express";
import { Application } from 'express';

export const welcomeRoute = (app: Application): void => {
 
    app.get('/api', (req: Request, res: Response) => {
        return res.status(200).send({ message: 'welcome' });
    });
};

