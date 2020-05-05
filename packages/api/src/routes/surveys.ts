import express, { Request, Response } from 'express';
import { SurveyModel } from '../models/Survey';

const router = express.Router();

const mongoCleaner = (
  req: Request & { user: User },
  res: Response,
  next: () => void
) => {
  delete req.body._id;
  delete req.body._vv;
  next();
};

router.use(mongoCleaner);

router.get('/', (req: Request & { user: User }, res, next) => {
  const { user } = req;

  SurveyModel.find({ userId: user._id })
    .then((data: Survey[]) => res.json(data))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.get('/:id', (req: Request & { user: User }, res, next) => {
  const { user, params } = req;
  const { id } = params;

  SurveyModel.find({ userId: user._id, _id: id })
    .then((data: Survey) => res.json(data))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.post('/', (req: Request & { user: User }, res, next) => {
  const { user, body } = req;
  const survey = new SurveyModel({ ...body, userId: user._id });

  survey
    .save()
    .then(() => res.status(200).json(survey))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.put('/:id', (req: Request & { user: User }, res) => {
  const { user, body, params } = req;
  const { id } = params;

  SurveyModel.findOneAndUpdate({ userId: user._id, _id: id }, body)
    .then(() => res.status(200).json({ success: true }))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

router.delete('/:id', (req: Request & { user: User }, res, next) => {
  const { user, params } = req;
  const { id } = params;

  SurveyModel.findOneAndDelete({ userId: user._id, _id: id })
    .then(() => res.status(200).json({ success: true }))
    .catch((ex: Error) =>
      res.status(500).json({ success: false, error: ex.message })
    );
});

export default router;
