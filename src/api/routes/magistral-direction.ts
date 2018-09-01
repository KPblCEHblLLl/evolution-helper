import {Request, Response, Router} from "express";
import {IMagistralDirectionModel, MagistralDirection} from '../../mongo/MagistralDirectionItem';
import userId from "../userId";

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
    const item = new MagistralDirection({
        name: req.body.name,
        description: req.body.description,
        userId,
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

        item.name = req.body.name;
        item.description = req.body.description;
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
