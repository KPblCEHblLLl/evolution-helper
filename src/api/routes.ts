import {Request, Response} from "express";
import * as express from "express";

export default (app: express.Application) => {
    app.route('/api/magistral-direction/')
        .get((req: Request, res: Response) => {
            res.status(200).send({ff: 3});
        })
};