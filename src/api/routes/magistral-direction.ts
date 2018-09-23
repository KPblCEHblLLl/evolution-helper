import {Request, Response, Router} from "express";
import {
    IMongoMagistralDirection,
    IMongoMagistralDirectionDocument,
    MongoMagistralDirectionCollection
} from '../mongo/MongoMagistralDirectionCollection';
import userId from "../userId";
import {IJsonResponse} from "./types";
import {IApiMagistralDirectionUpdate} from "../model/ApiMagistralDirectionUpdate";
import {IApiMagistralDirection, parseMongoDocumentToApiMagistralDirection} from "../model/ApiMagistralDirection";
import {
    IApiMagistralDirectionClassif,
    parseMongoDocumentToApiMagistralDirectionClassif
} from "../model/ApiMagistralDirectionClassif";

const router: Router = Router();

router.get('/', (req: Request, res: IJsonResponse<IApiMagistralDirection[]>) => {
    MongoMagistralDirectionCollection.find({userId}, (err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(list.map(parseMongoDocumentToApiMagistralDirection));
        }
    });
});

router.get('/:id', (req: Request, res: IJsonResponse<IApiMagistralDirection>) => {
    MongoMagistralDirectionCollection.findOne({userId, _id: req.params.id}, (err: any, item) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(item && parseMongoDocumentToApiMagistralDirection(item));
        }
    });
});

router.post('/', (req: Request, res: IJsonResponse<IApiMagistralDirection>) => {
    const userData: IApiMagistralDirectionUpdate = req.body;
    const itemData: IMongoMagistralDirection = {
        name: userData.name,
        description: userData.description,
        userId,
        dateCreated: new Date(),
    };

    const item = new MongoMagistralDirectionCollection(itemData);

    item.save(() => {
        console.log('MN created');
        res.status(200).send(parseMongoDocumentToApiMagistralDirection(item));
    });
});

router.put('/:id', (req: Request, res: IJsonResponse<IApiMagistralDirection>) => {
    const userData: IApiMagistralDirectionUpdate = req.body;

    MongoMagistralDirectionCollection.findOne({
        _id: req.params.id,
        userId,
    }, (err: any, item: IMongoMagistralDirectionDocument) => {
        if (err) {
            res.status(503).send(null);
            return;
        }

        item.name = userData.name;
        item.description = userData.description;

        item.dateModified = new Date();

        item.save(() => {
            console.log('MN updated');
            res.status(200).send(parseMongoDocumentToApiMagistralDirection(item));
        });
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    MongoMagistralDirectionCollection.remove({
        id: req.params.id,
        userId,
    }, (err: any) => {
        if (err) {
            res.status(503).send();
            return;
        }
        console.log('MN deleted');
        res.status(200).send();
    });
});

router.get('/findByName/:name', (req: Request, res: IJsonResponse<IApiMagistralDirectionClassif[]>) => {
    const filter = {
        userId,
        name: {
            $regex: new RegExp(req.params.name, 'i'),
        }
    };

    MongoMagistralDirectionCollection.find(filter).sort({name: 1}).limit(2).exec((err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(list.map(parseMongoDocumentToApiMagistralDirectionClassif));
        }
    });
});


export default router;
