import {Request, Response, Router} from "express";
import {IMagistralDirectionModel, MagistralDirection} from '../../mongo/MagistralDirectionItem';
import userId from "../userId";
import assignKeys from "../../util/assignKeys";
import {IMagistralDirectionServiceData, IMagistralDirectionUserDataKeys} from "../../interface/magistral-direction";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    MagistralDirection.find({userId}, (err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(list);
        }
    });
});

router.get('/:id', (req: Request, res: Response) => {
    MagistralDirection.findOne({userId, _id: req.params.id}, (err: any, item) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(item);
        }
    });
});

router.post('/', (req: Request, res: Response) => {
    const userData = assignKeys({}, IMagistralDirectionUserDataKeys, req.body);
    const serviceData: IMagistralDirectionServiceData = {
        userId,
        dateCreated: new Date(),
    };
    const item = new MagistralDirection({
        ...userData,
        ...serviceData,
    });

    item.save(() => {
        console.log('MN created');
        res.status(200).send(item);
    });
});

router.put('/:id', (req: Request, res: Response) => {
    MagistralDirection.findOne({
        _id: req.params.id,
        userId,
    }, (err: any, item: IMagistralDirectionModel) => {
        if (err) {
            res.status(503).send();
            return;
        }

        assignKeys(item, IMagistralDirectionUserDataKeys, req.body);
        item.dateModified = new Date();

        item.save(() => {
            console.log('MN updated');
            res.status(200).send(item);
        });
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    MagistralDirection.remove({
        _id: req.params.id,
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

export default router;
