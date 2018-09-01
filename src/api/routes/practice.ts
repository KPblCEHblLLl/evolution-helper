import {Request, Response, Router} from "express";
import userId from "../userId";
import {IPracticeModel, Practice} from "../../mongo/PracticeItem";
import {IPractice, IPracticeServiceData, IPracticeUserDataKeys} from "../../interface/practice";
import assignKeys from "../../util/assignKeys";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    Practice.find({userId}, (err: any, list) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(list);
        }
    });
});

router.get('/:id', (req: Request, res: Response) => {
    Practice.findOne({userId, _id: req.params.id}, (err: any, item) => {
        if (err != null) {
            res.status(503).send(err);
        } else {
            res.status(200).send(item);
        }
    });
});

router.post('/', (req: Request, res: Response) => {
    const userData = assignKeys({}, IPracticeUserDataKeys, req.body);
    const serviceData = <IPracticeServiceData>{
        userId: userId,
    };

    const item = new Practice(<IPractice>{
        ...userData,
        ...serviceData,
    });

    item.save(() => {
        console.log('Practice created');
        res.status(200).send(item);
    });
});

router.put('/:id', (req: Request, res: Response) => {
    Practice.findOne({
        _id: req.params.id,
        userId,
    }, (err: any, item: IPracticeModel) => {
        if (err) {
            res.status(503).send();
            return;
        }

        assignKeys(item, IPracticeUserDataKeys, req.body);
        item.dateModified = new Date();

        item.save(() => {
            console.log('Practice updated');
            res.status(200).send(item);
        });
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    Practice.remove({
        _id: req.params.id,
        userId,
    }, (err: any) => {
        if (err) {
            res.status(503).send();
            return;
        }
        console.log('Practice deleted');
        res.status(200).send();
    });
});

export default router;
