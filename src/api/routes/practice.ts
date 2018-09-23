import {Request, Response, Router} from "express";
import userId from "../userId";
import {
    IMongoPractice,
    MongoPracticeCollection
} from "../mongo/MongoPracticeCollection";
import {IJsonResponse} from "./types";
import {IApiPracticeUpdate} from "../model/ApiPracticeUpdate";
import {IApiPractice, parseMongoDocumentToApiPractice} from "../model/ApiPractice";
import {ObjectID} from "bson";

const router: Router = Router();

router.get('/', (req: Request, res: IJsonResponse<IApiPractice[]>) => {
    MongoPracticeCollection.find({userId}, (err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            Promise.all(list.map(parseMongoDocumentToApiPractice)).then((modelsList) => {
                res.status(200).send(modelsList);
            })
        }
    });
});

router.get('/:id', (req: Request, res: IJsonResponse<IApiPractice>) => {
    MongoPracticeCollection.findOne({userId, _id: req.params.id}, (err: any, item) => {
        if (err != null) {
            res.status(503).send(err);
        } else {

            if (item === null) {
                res.status(200).send(null);
            } else {
                parseMongoDocumentToApiPractice(item).then((model) => {
                    res.status(200).send(model);
                })
            }
        }
    });
});

router.post('/', (req: Request, res: IJsonResponse<IApiPractice>) => {
    const userData: IApiPracticeUpdate = req.body;
    const itemData: IMongoPractice = {
        name: userData.name,
        description: userData.description,
        metrics: userData.metrics,
        magistralDirections: userData.magistralDirections.filter(x => ObjectID.isValid(x)),

        userId,
        dateCreated: new Date(),
    };
    const item = new MongoPracticeCollection(itemData);

    item.save(() => {
        console.log('MongoPractice created');
        parseMongoDocumentToApiPractice(item).then((model) => {
            res.status(200).send(model);
        })
    });
});

router.put('/:id', (req: Request, res: IJsonResponse<IApiPractice>) => {
    const userData: IApiPracticeUpdate = req.body;
    const updateData: Partial<IMongoPractice> = {
        name: userData.name,
        description: userData.description,
        metrics: userData.metrics,
        magistralDirections: userData.magistralDirections.filter(x => ObjectID.isValid(x)),
        dateModified: new Date(),
    };

    MongoPracticeCollection.update({
        _id: req.params.id,
        userId,
    }, {
        $set: updateData
    }, (err: any) => {
        if (err) {
            res.status(503).send(null);
            return;
        }
        console.log('MongoPractice updated');
        res.status(200).send(null);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    MongoPracticeCollection.remove({
        _id: req.params.id,
        userId,
    }, (err: any) => {
        if (err) {
            res.status(503).send();
            return;
        }
        console.log('MongoPractice deleted');
        res.status(200).send();
    });
});

export default router;
