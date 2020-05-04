import express, { Request, Response } from 'express';
import { TestModel } from '../models/Test';

const router = express.Router();

const mongoCleaner = (req: Request & { user: User }, res: Response, next: () => void) => {
  delete req.body._id;
  delete req.body._vv;
  next();
};

router.use(mongoCleaner);

router.get('/', (req: Request & { user: User }, res, next) => {
  const { user } = req;

  TestModel.find({ userId: user._id })
    .then((data: Test[]) => res.json(data))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.get('/:id', (req: Request & { user: User }, res, next) => {
  const { user, params } = req;
  const { id } = params;

  TestModel.find({ userId: user._id, _id: id })
    .then((data: Test) => res.json(data))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.post('/', (req: Request & { user: User }, res, next) => {
  const { user, body } = req;
  const test = new TestModel({ ...body, userId: user._id });

  test
    .save()
    .then(() => res.status(200).json(test))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.put('/:id', (req: Request & { user: User }, res) => {
  const { user, body, params } = req;
  const { id } = params;

  TestModel.findOneAndUpdate({ userId: user._id, _id: id }, body)
    .then(() => res.status(200).json({ success: true }))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.delete('/:id', (req: Request & { user: User }, res, next) => {
  const { user, params } = req;
  const { id } = params;

  TestModel.findOneAndDelete({ userId: user._id, _id: id })
    .then(() => res.status(200).json({ success: true }))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

export default router;
