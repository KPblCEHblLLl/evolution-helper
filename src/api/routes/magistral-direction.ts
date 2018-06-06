import {Request, Response, Router} from "express";
import {MagistralDirectionItemModel} from '../../mongo/MagistralDirectionItem';
import {ObjectID} from "mongodb";

const router: Router = Router();
const userId = new ObjectID('5b1822bed92d33f83bbc9014');

// router.use('/', (req: Request, res: Response, next) => {
//     console.log(req.params);
//     if (!req.params.user || !req.params.user.id) {
//         console.log('unauthorized');
//         res.status(401).send('unauthorized');
//     } else {
//         next();
//     }
// });

router.get('/', (req: Request, res: Response) => {
    MagistralDirectionItemModel.find({userId}, (err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(list);
        }
    });
});

router.get('/:id', (req: Request, res: Response) => {
    MagistralDirectionItemModel.find({userId, _id: req.params.id}, (err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(list);
        }
    });
});

router.post('/', (req: Request, res: Response) => {
    let item = new MagistralDirectionItemModel({
        name: req.body.name,
        descrption: req.body.descrption,
        userId,
    });

    item.save((err: any) => {
        return res.status(200).send(item);
    });
});

router.put('/:id', (req: Request, res: Response) => {
    MagistralDirectionItemModel.findOne({
        _id: req.params.id,
        userId,
    }, (err: any, item: MagistralDirectionItemModel) => {
        if (err) {
            res.status(503).send();
            return;
        }

        item.name = req.body.name;
        item.descrption = req.body.descrption;

        item.save();
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    MagistralDirectionItemModel.remove({
        _id: req.params.id,
        userId,
    }, (err: any) => {
        if (err) {
            res.status(503).send();
            return;
        }
        res.status(200).send();
    });
});

export default router;
