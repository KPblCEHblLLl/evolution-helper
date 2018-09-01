import * as express from "express";
import magistralDirection from './magistral-direction'
import practice from './practice'

export default (app: express.Application) => {
    // app.use((req: Request, res: Response, next) => {
    //     console.log('applying auth');
    //     console.log(req.params);
    //     req.params.user = {
    //         id: new ObjectID('5b1822bed92d33f83bbc9014'),
    //     };
    //     next();
    // });

    app.use('/api/magistral-direction/', magistralDirection);
    app.use('/api/practice/', practice);
};
